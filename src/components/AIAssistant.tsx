import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Minimize2, Maximize2, Sparkles, Zap, AlertCircle } from 'lucide-react';

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
      content: "Hi! I'm your AI learning assistant. I can help you with game development, programming, career advice, or any questions about SkillArena. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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

  // Simulated AI responses for common questions
  const getSimulatedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('game development') || input.includes('start learning')) {
      return "Great question! To start learning game development, I recommend:\n\n1. **Choose an Engine**: Unity (C#) for beginners, Unreal Engine (C++/Blueprints) for advanced graphics\n2. **Learn Programming**: C# for Unity, C++ or Blueprint for Unreal\n3. **Start Small**: Begin with simple games like Pong or Tetris\n4. **Take Our Tutorials**: Check out our 'Game Development Fundamentals' course in the Tutorials section!\n\nWould you like specific recommendations based on your experience level?";
    }
    
    if (input.includes('programming language') || input.includes('languages')) {
      return "For game development, here are the most important programming languages:\n\n🎮 **C#**: Perfect for Unity, easy to learn, great for beginners\n⚡ **C++**: Used in Unreal Engine, AAA games, high performance\n🌐 **JavaScript**: Web games, browser-based development\n🐍 **Python**: Game scripting, tools, AI/ML in games\n\nI'd recommend starting with C# and Unity - it's beginner-friendly and widely used in the industry!";
    }
    
    if (input.includes('game test') || input.includes('tester') || input.includes('qa')) {
      return "Becoming a game tester is an excellent entry point into the gaming industry! Here's how:\n\n📝 **Skills Needed**:\n- Attention to detail\n- Clear communication\n- Patience and persistence\n- Basic understanding of games\n\n🚀 **Getting Started**:\n1. Check our Game Testing section for opportunities\n2. Complete our 'Professional Game Testing' tutorial\n3. Practice writing detailed bug reports\n4. Apply to beta testing programs\n\nMany of our partners are always looking for reliable testers!";
    }
    
    if (input.includes('unity') || input.includes('unreal')) {
      return "Great question about game engines!\n\n**Unity**:\n✅ Beginner-friendly\n✅ C# programming\n✅ Great for 2D and mobile games\n✅ Large community and resources\n\n**Unreal Engine**:\n✅ Industry-standard for AAA games\n✅ Amazing graphics capabilities\n✅ Blueprint visual scripting\n✅ Free for small projects\n\n**Recommendation**: Start with Unity if you're new to programming, choose Unreal if you want cutting-edge graphics or have C++ experience.";
    }
    
    if (input.includes('career') || input.includes('job') || input.includes('industry')) {
      return "The gaming industry offers many exciting career paths:\n\n🎨 **Creative Roles**:\n- Game Designer\n- Level Designer\n- Artist/Animator\n- Sound Designer\n\n⚙️ **Technical Roles**:\n- Programmer/Developer\n- QA Tester\n- Technical Artist\n- DevOps Engineer\n\n📊 **Business Roles**:\n- Producer\n- Marketing\n- Community Manager\n\nOur platform helps you explore all these paths with hands-on experience!";
    }

    if (input.includes('tutorial') || input.includes('course') || input.includes('learn')) {
      return "We have amazing tutorials in our Tutorials section! Here are some popular ones:\n\n🎮 **Game Development Fundamentals** - Perfect for beginners\n💻 **Advanced JavaScript Patterns** - Level up your coding\n🎨 **Creative Coding & Visual Art** - Explore the artistic side\n🤖 **AI & Machine Learning Basics** - Future-proof your skills\n🧪 **Professional Game Testing** - Start your QA career\n\nAll tutorials include hands-on projects and real-world applications!";
    }
    
    return "That's an interesting question! While I'd love to give you a more detailed response, I'm currently running in demo mode. However, I can help you with:\n\n• Game development guidance\n• Programming language recommendations\n• Career advice in gaming\n• Platform features and tutorials\n\nTry asking about specific topics like 'How to start game development' or 'Best programming languages for games'!";
  };

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

    // Simulate thinking time
    setTimeout(() => {
      const response = getSimulatedResponse(currentInput);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute -top-12 right-0 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </div>
      </button>
    );
  }

  return (
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
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
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
                        <span className="text-xs text-purple-400 font-semibold">AI Assistant</span>
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
              AI Assistant • Demo mode with smart responses
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;