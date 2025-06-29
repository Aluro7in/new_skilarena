interface ElevenLabsConfig {
  apiKey: string;
  baseUrl: string;
}

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
  preview_url?: string;
  available_for_tiers?: string[];
}

interface TTSRequest {
  text: string;
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export class ElevenLabsService {
  private config: ElevenLabsConfig;
  private isConfigured: boolean;
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;

  constructor() {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    this.isConfigured = !!apiKey && 
                        !apiKey.includes('your_elevenlabs_api_key') && 
                        !apiKey.includes('sk-') &&
                        apiKey.length > 10;
    
    this.config = {
      apiKey: apiKey || '',
      baseUrl: 'https://api.elevenlabs.io'
    };

    this.synthesis = window.speechSynthesis;

    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }

    if (!this.isConfigured) {
      console.warn('ElevenLabs API key not configured. Using browser speech synthesis.');
    }
  }

  async textToSpeech(text: string, voiceId?: string): Promise<void> {
    if (this.isConfigured && voiceId) {
      try {
        const response = await fetch(`${this.config.baseUrl}/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.0,
              use_speaker_boost: true
            }
          } as TTSRequest)
        });

        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = reject;
          audio.play();
        });

      } catch (error) {
        console.error('ElevenLabs TTS error, falling back to browser synthesis:', error);
        this.fallbackTextToSpeech(text);
      }
    } else {
      this.fallbackTextToSpeech(text);
    }
  }

  private fallbackTextToSpeech(text: string): void {
    if (this.synthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Use a pleasant voice if available
      const voices = this.synthesis.getVoices();
      
      let preferredVoice;
      try {
        preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.lang === 'en-US'
        );
      } catch (e) {
        console.warn('Error finding preferred voice:', e);
      }
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      this.synthesis.speak(utterance);
    }
  }

  async speechToText(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not available'));
        return;
      }

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        // Recognition ended
      };

      this.recognition.start();
    });
  }

  async getVoices(): Promise<Voice[]> {
    if (!this.isConfigured) {
      return this.getMockVoices();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/voices`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'xi-api-key': this.config.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
      return this.getMockVoices();
    }
  }

  private getMockVoices(): Voice[] {
    return [
      {
        voice_id: 'rachel',
        name: 'Rachel',
        category: 'premade',
        description: 'American Female'
      },
      {
        voice_id: 'drew',
        name: 'Drew',
        category: 'premade',
        description: 'American Male'
      },
      {
        voice_id: 'clyde',
        name: 'Clyde',
        category: 'premade',
        description: 'American Male'
      }
    ];
  }

  stopSpeech(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  isSpeechRecognitionAvailable(): boolean {
    return !!this.recognition || !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  isApiConfigured(): boolean {
    return this.isConfigured;
  }
}

export const elevenLabsService = new ElevenLabsService();