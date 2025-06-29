import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Minimize2, Maximize2, Sparkles, Zap, AlertCircle, Wifi, WifiOff, Video, Mic } from 'lucide-react';
import { openaiService, type AIMessage } from '../services/openai';
import VideoAIAssistant from './VideoAIAssistant';
import VoiceAIAssistant from './VoiceAIAssistant';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: openaiService.isApiConfigured() 
        ? "Hi! I'm your AI learning assistant powered by ChatGPT. I can help you with game development, programming, career advice, or any questions about SkillArena. You can also try my video or voice modes for a more interactive experience! What would you like to know?"
        : "Hi! I'm your AI learning assistant. I can help you with game development, programming, career advice, or any questions about SkillArena. You can also try my video or voice modes for a more interactive experience! What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVideoAI, setShowVideoAI] = useState(false);
  const [showVoiceAI, setShowVoiceAI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Convert messages to OpenAI format
      const conversationHistory: AIMessage[] = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await openaiService.generateResponse(conversationHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('AI Assistant Error:', error);
      setError('Sorry, I encountered an error while processing your request. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const clearConversation = () => {
    setMessages([{
      id: '1',
      content: openaiService.isApiConfigured() 
        ? "Hi! I'm your AI learning assistant powered by ChatGPT. I can help you with game development, programming, career advice, or any questions about SkillArena. You can also try my video or voice modes for a more interactive experience! What would you like to know?"
        : "Hi! I'm your AI learning assistant. I can help you with game development, programming, career advice, or any questions about SkillArena. You can also try my video or voice modes for a more interactive experience! What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }]);
    setError(null);
  };

  const suggestedQuestions = [
    "How do I start learning game development?",
    "What programming languages should I learn for gaming?",
    "How can I become a game tester?",
    "Tell me about Unity vs Unreal Engine",
    "What are the best career paths in gaming?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 group"
      >
        <Bot className="h-6 w-6" />
        <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse ${
          openaiService.isApiConfigured() ? 'bg-green-400' : 'bg-yellow-400'
        }`}></div>
        <div className="absolute -top-12 right-0 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant {openaiService.isApiConfigured() ? '(Live)' : '(Demo)'}
        </div>
      </button>
    );
  }

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 flex flex-col ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  openaiService.isApiConfigured() ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-gray-400">
                  {openaiService.isApiConfigured() ? 'ChatGPT Powered' : 'Demo Mode'}
                </span>
                {openaiService.isApiConfigured() ? (
                  <Wifi className="h-3 w-3 text-green-400" />
                ) : (
                  <WifiOff className="h-3 w-3 text-yellow-400" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVideoAI(true)}
              className="text-gray-400 hover:text-blue-400 transition-colors p-1 rounded-lg hover:bg-white/10"
              title="Video AI"
            >
              <Video className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowVoiceAI(true)}
              className="text-gray-400 hover:text-green-400 transition-colors p-1 rounded-lg hover:bg-white/10"
              title="Voice AI"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={clearConversation}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              title="Clear conversation"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Error Display */}
              {error && (
                <div className="mx-4 mt-4 bg-red-600/20 border border-red-500/30 rounded-xl p-3 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-black/30 backdrop-blur-sm border border-white/10 text-gray-100'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-3 w-3 text-purple-400" />
                          <span className="text-xs text-purple-400 font-semibold">
                            AI Assistant {openaiService.isApiConfigured() ? '(ChatGPT)' : '(Demo)'}
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      <div className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 text-gray-100 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-3 w-3 text-purple-400" />
                        <span className="text-xs text-purple-400 font-semibold">AI Assistant</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex-shrink-0">
                  <div className="text-xs text-gray-400 mb-2">Suggested questions:</div>
                  <div className="space-y-1">
                    {suggestedQuestions.slice(0, 2).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="w-full text-left bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-2 text-xs text-gray-300 hover:bg-black/30 hover:text-white transition-all"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about learning..."
                  className="flex-1 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {openaiService.isApiConfigured() 
                  ? 'AI Assistant powered by ChatGPT • Live responses • Video & Voice modes available'
                  : 'AI Assistant • Demo mode with smart responses • Video & Voice modes available'
                }
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video AI Assistant Modal */}
      <VideoAIAssistant 
        isOpen={showVideoAI} 
        onClose={() => setShowVideoAI(false)} 
      />

      {/* Voice AI Assistant Modal */}
      <VoiceAIAssistant 
        isOpen={showVoiceAI} 
        onClose={() => setShowVoiceAI(false)} 
      />
    </>
  );
};

export default AIAssistant;