import React, { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Settings, Users } from 'lucide-react';
import { tavusService } from '../services/tavus';

interface TavusReplica {
  replica_id: string;
  replica_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface VideoAIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoAIAssistant: React.FC<VideoAIAssistantProps> = ({ isOpen, onClose }) => {
  const [replicas, setReplicas] = useState<TavusReplica[]>([]);
  const [selectedReplica, setSelectedReplica] = useState<TavusReplica | null>(null);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadReplicas();
    }
  }, [isOpen]);

  const loadReplicas = async () => {
    setLoading(true);
    try {
      const replicasList = await tavusService.getReplicas();
      setReplicas(replicasList);
      if (replicasList.length > 0) {
        setSelectedReplica(replicasList[0]);
      }
    } catch (error) {
      console.error('Error loading replicas:', error);
    } finally {
      setLoading(false);
    }
  };

  const startVideoConversation = async () => {
    if (!selectedReplica) return;

    setIsConnecting(true);
    try {
      if (tavusService.isApiConfigured()) {
        const conversation = await tavusService.createConversation(selectedReplica.replica_id, {
          conversation_name: `SkillArena Session - ${new Date().toISOString()}`
        });
        setConversationUrl(conversation.conversation_url);
      } else {
        // Demo mode
        setConversationUrl(tavusService.getDemoConversationUrl());
      }
      setIsConnected(true);
    } catch (error) {
      console.error('Error starting video conversation:', error);
      alert('Failed to start video conversation. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const endVideoConversation = () => {
    setIsConnected(false);
    setConversationUrl(null);
    setIsMuted(false);
    setIsVideoEnabled(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Video Assistant</h2>
              <p className="text-gray-400 text-sm">
                {tavusService.isApiConfigured() ? 'Powered by Tavus' : 'Demo Mode'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>

        {!isConnected ? (
          // Pre-call setup
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Choose Your AI Assistant</h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {replicas.map((replica) => (
                    <button
                      key={replica.replica_id}
                      onClick={() => setSelectedReplica(replica)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedReplica?.replica_id === replica.replica_id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{replica.replica_name}</h4>
                          <p className="text-gray-400 text-sm capitalize">{replica.status}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!tavusService.isApiConfigured() && (
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-200 text-sm">
                  <strong>Demo Mode:</strong> To enable real AI video conversations, add your Tavus API key to the environment variables.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={startVideoConversation}
                disabled={!selectedReplica || isConnecting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    <span>Start Video Call</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Active video call
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center">
              {conversationUrl && tavusService.isApiConfigured() ? (
                <iframe
                  src={conversationUrl}
                  className="w-full h-full rounded-xl"
                  allow="microphone; camera"
                  title="Tavus AI Video Conversation"
                />
              ) : (
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Demo Video Call</h3>
                  <p className="text-gray-400">
                    In a real implementation, this would show your Tavus AI video conversation.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Add your Tavus API key to enable live video AI interactions.
                  </p>
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-all ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-all ${
                  !isVideoEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isVideoEnabled ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={endVideoConversation}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all"
              >
                <PhoneOff className="h-5 w-5 text-white" />
              </button>

              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-all">
                <Settings className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Call Info */}
            <div className="text-center">
              <p className="text-white font-semibold">{selectedReplica?.replica_name}</p>
              <p className="text-gray-400 text-sm">Video call in progress</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAIAssistant;