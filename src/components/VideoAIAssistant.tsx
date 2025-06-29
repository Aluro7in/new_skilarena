import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Settings, Users, Camera, AlertCircle, Loader } from 'lucide-react';
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
  const [hasPermissions, setHasPermissions] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadReplicas();
      requestPermissions();
    }
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setHasPermissions(true);
      setPermissionError(null);
    } catch (error: any) {
      console.error('Error accessing camera/microphone:', error);
      setPermissionError(
        error.name === 'NotAllowedError' 
          ? 'Camera and microphone access denied. Please allow access to use video AI features.'
          : 'Unable to access camera or microphone. Please check your device settings.'
      );
      setHasPermissions(false);
    }
  };

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
        // Demo mode with simulated video
        setConversationUrl('demo-mode');
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
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isVideoEnabled;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
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

        {/* Permission Error */}
        {permissionError && (
          <div className="mb-6 bg-red-600/20 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-red-300 text-sm">{permissionError}</p>
            </div>
            <button
              onClick={requestPermissions}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isConnected ? (
          // Pre-call setup
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Choose Your AI Assistant</h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="animate-spin h-8 w-8 text-purple-500" />
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

            {/* Camera Preview */}
            {hasPermissions && (
              <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Your Camera Preview</h3>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

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
                disabled={!selectedReplica || isConnecting || !hasPermissions}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
              >
                {isConnecting ? (
                  <>
                    <Loader className="animate-spin h-5 w-5" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    <span>Start Video Call with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Active video call
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* AI Video */}
              <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center relative">
                {conversationUrl && tavusService.isApiConfigured() && conversationUrl !== 'demo-mode' ? (
                  <iframe
                    src={conversationUrl}
                    className="w-full h-full rounded-xl"
                    allow="microphone; camera"
                    title="Tavus AI Video Conversation"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{selectedReplica?.replica_name}</h3>
                    <p className="text-gray-400 text-sm">
                      {tavusService.isApiConfigured() 
                        ? 'AI Assistant is ready to chat!'
                        : 'Demo AI Assistant - Add Tavus API key for real video conversations'
                      }
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  AI Assistant
                </div>
              </div>

              {/* User Video */}
              <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center relative">
                {hasPermissions ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover rounded-xl ${!isVideoEnabled ? 'opacity-0' : ''}`}
                  />
                ) : (
                  <div className="text-center p-8">
                    <Camera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Camera access needed</p>
                  </div>
                )}
                {!isVideoEnabled && (
                  <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  You
                </div>
                <div className="absolute top-3 right-3">
                  <div className={`w-3 h-3 rounded-full ${hasPermissions ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                </div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-all ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-all ${
                  !isVideoEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {isVideoEnabled ? <Video className="h-5 w-5 text-white" /> : <VideoOff className="h-5 w-5 text-white" />}
              </button>

              <button
                onClick={endVideoConversation}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all"
                title="End call"
              >
                <PhoneOff className="h-5 w-5 text-white" />
              </button>

              <button className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-all" title="Settings">
                <Settings className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Call Info */}
            <div className="text-center bg-gray-800/50 rounded-xl p-4">
              <p className="text-white font-semibold text-lg">{selectedReplica?.replica_name}</p>
              <p className="text-gray-400 text-sm">Video conversation in progress</p>
              <div className="flex justify-center items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Connected</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAIAssistant;