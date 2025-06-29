import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Phone, Settings, Waves } from 'lucide-react';
import { elevenLabsService } from '../services/elevenlabs';
import { openaiService } from '../services/openai';

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
}

interface VoiceAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAIAssistant: React.FC<VoiceAIAssistantProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  useEffect(() => {
    if (isOpen) {
      loadVoices();
    }
  }, [isOpen]);

  const loadVoices = async () => {
    try {
      const voicesList = await elevenLabsService.getVoices();
      setVoices(voicesList);
      if (voicesList.length > 0) {
        setSelectedVoice(voicesList[0]);
      }
    } catch (error) {
      console.error('Error loading voices:', error);
    }
  };

  const startListening = async () => {
    if (!elevenLabsService.isSpeechRecognitionAvailable()) {
      setError('Speech recognition is not available in your browser');
      return;
    }

    setIsListening(true);
    setError(null);
    setTranscript('');

    try {
      const transcript = await elevenLabsService.speechToText();
      setTranscript(transcript);
      await processVoiceInput(transcript);
    } catch (error: any) {
      console.error('Speech recognition error:', error);
      setError('Failed to recognize speech. Please try again.');
    } finally {
      setIsListening(false);
    }
  };

  const processVoiceInput = async (inputText: string) => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    try {
      // Add user message to conversation history
      const newHistory = [...conversationHistory, { role: 'user' as const, content: inputText }];
      setConversationHistory(newHistory);

      // Get AI response
      const aiResponse = await openaiService.generateResponse(newHistory);
      setResponse(aiResponse);

      // Add AI response to conversation history
      const updatedHistory = [...newHistory, { role: 'assistant' as const, content: aiResponse }];
      setConversationHistory(updatedHistory);

      // Speak the response
      await speakResponse(aiResponse);
    } catch (error: any) {
      console.error('Error processing voice input:', error);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speakResponse = async (text: string) => {
    setIsSpeaking(true);
    try {
      await elevenLabsService.textToSpeech(text, selectedVoice?.voice_id);
    } catch (error) {
      console.error('Error speaking response:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    elevenLabsService.stopSpeech();
    setIsSpeaking(false);
  };

  const clearConversation = () => {
    setConversationHistory([]);
    setTranscript('');
    setResponse('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
              <Volume2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Voice AI Assistant</h2>
              <p className="text-gray-400 text-sm">
                {elevenLabsService.isApiConfigured() ? 'Powered by ElevenLabs' : 'Browser Speech API'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Phone className="h-6 w-6" />
          </button>
        </div>

        {/* Voice Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Choose Voice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {voices.map((voice) => (
              <button
                key={voice.voice_id}
                onClick={() => setSelectedVoice(voice)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  selectedVoice?.voice_id === voice.voice_id
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="font-medium text-white">{voice.name}</div>
                {voice.description && (
                  <div className="text-sm text-gray-400">{voice.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 bg-red-600/20 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Voice Interface */}
        <div className="space-y-6">
          {/* Main Voice Button */}
          <div className="text-center">
            <button
              onClick={isListening ? undefined : startListening}
              disabled={isListening || isProcessing || isSpeaking}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : isProcessing
                  ? 'bg-yellow-500 animate-spin'
                  : isSpeaking
                  ? 'bg-blue-500 animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isListening ? (
                <Waves className="h-12 w-12 text-white" />
              ) : isProcessing ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSpeaking ? (
                <Volume2 className="h-12 w-12 text-white" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </button>
            <p className="text-white mt-4 font-semibold">
              {isListening ? 'Listening...' : 
               isProcessing ? 'Processing...' :
               isSpeaking ? 'Speaking...' :
               'Tap to speak'}
            </p>
          </div>

          {/* Transcript and Response */}
          {(transcript || response) && (
            <div className="space-y-4">
              {transcript && (
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">You said:</h4>
                  <p className="text-white">{transcript}</p>
                </div>
              )}
              
              {response && (
                <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
                  <h4 className="text-green-300 font-semibold mb-2">AI Response:</h4>
                  <p className="text-white">{response}</p>
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all"
              >
                <VolumeX className="h-5 w-5 text-white" />
              </button>
            )}

            <button
              onClick={clearConversation}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white transition-all"
            >
              Clear
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-all">
              <Settings className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">How to use:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Tap the microphone to start speaking</li>
              <li>• Wait for the AI to process and respond</li>
              <li>• The response will be spoken aloud automatically</li>
              <li>• Choose different voices for varied experiences</li>
            </ul>
          </div>

          {!elevenLabsService.isApiConfigured() && (
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> Using browser speech synthesis. Add your ElevenLabs API key for premium voice quality.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAIAssistant;