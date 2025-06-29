interface TavusConfig {
  apiKey: string;
  baseUrl: string;
}

interface TavusConversationRequest {
  replica_id: string;
  conversation_name?: string;
  callback_url?: string;
  properties?: {
    max_call_duration?: number;
    participant_left_timeout?: number;
    participant_absent_timeout?: number;
    enable_recording?: boolean;
  };
}

interface TavusConversationResponse {
  conversation_id: string;
  conversation_url: string;
  conversation_token?: string;
}

interface TavusReplica {
  replica_id: string;
  replica_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  voice_id?: string;
  avatar_id?: string;
}

export class TavusService {
  private config: TavusConfig;
  private isConfigured: boolean;
  private lastError: Error | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_TAVUS_API_KEY;
    this.isConfigured = !!apiKey && apiKey !== 'your_tavus_api_key' && !apiKey.includes('api_key');
    
    this.config = {
      apiKey: apiKey || '',
      baseUrl: 'https://tavusapi.com'
    };

    if (!this.isConfigured) {
      console.warn('Tavus API key not configured. Video AI features will be limited.');
    }
  }

  async createConversation(replicaId: string, options?: Partial<TavusConversationRequest>): Promise<TavusConversationResponse> {
    if (!this.isConfigured) {
      console.warn('Tavus API not configured, returning demo URL');
      return {
        conversation_id: 'demo-id',
        conversation_url: this.getDemoConversationUrl()
      };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/v2/conversations`, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          replica_id: replicaId,
          conversation_name: options?.conversation_name || 'SkillArena AI Assistant',
          properties: {
            max_call_duration: 1800, // 30 minutes
            participant_left_timeout: 60,
            participant_absent_timeout: 300,
            enable_recording: false,
            ...options?.properties
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Tavus conversation:', error);
      throw error;
    }
  }

  async getReplicas(): Promise<TavusReplica[]> {
    if (!this.isConfigured) {
      return this.getMockReplicas();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/v2/replicas`, {
        method: 'GET',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Tavus replicas:', error);
      return this.getMockReplicas();
    }
  }

  private getMockReplicas(): TavusReplica[] {
    return [
      {
        replica_id: 'demo-replica-1',
        replica_name: 'SkillArena AI Tutor',
        status: 'ready',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        voice_id: 'voice-1',
        avatar_id: 'avatar-1'
      },
      {
        replica_id: 'demo-replica-2',
        replica_name: 'Game Development Mentor',
        status: 'ready',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        voice_id: 'voice-2',
        avatar_id: 'avatar-2'
      }
    ];
  }

  async endConversation(conversationId: string): Promise<void> {
    if (!this.isConfigured) {
      console.log('Demo: Conversation ended');
      return;
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/v2/conversations/${conversationId}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': this.config.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error ending Tavus conversation:', error);
      throw error;
    }
  }

  isApiConfigured(): boolean {
    return this.isConfigured;
  }

  getDemoConversationUrl(): string {
    return 'demo-mode';
  }
}

export const tavusService = new TavusService();