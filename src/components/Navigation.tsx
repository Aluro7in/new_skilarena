import React from 'react';
import { Home, BookOpen, Trophy, Sword, User, Star, GraduationCap, TestTube, Briefcase, Zap, Bot, LogOut, ShoppingCart, Calendar, Users, Globe, Award, Settings, Crown, AlertTriangle } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: { name: string; email: string };
  onAIToggle: () => void;
  showTroubleshooter: () => void;
  hasConnectionIssues?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  user, 
  onAIToggle, 
  showTroubleshooter,
  hasConnectionIssues = false
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'tutorials', label: 'Tutorials', icon: GraduationCap },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'game-testing', label: 'Testing', icon: TestTube },
    { id: 'challenges', label: 'Challenges', icon: Sword },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'team-management', label: 'Team', icon: Settings },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3" onClick={() => onTabChange('dashboard')}>
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-2 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                SkillArena
              </span>
              <div className="text-xs text-gray-400">Level Up Your Skills</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Connection status indicator */}
            <button
              onClick={showTroubleshooter}
              className={`border text-white p-2 rounded-lg transition-all relative group ${
                hasConnectionIssues 
                  ? 'bg-red-600/20 border-red-500/30 hover:bg-red-600/30 animate-pulse' 
                  : 'bg-black/30 border-white/10 hover:bg-black/50'
              }`}
              title={hasConnectionIssues ? "Connection Issues Detected" : "Check Connection Status"}
            >
              <AlertTriangle className={`h-5 w-5 ${
                hasConnectionIssues ? 'text-red-400' : 'text-gray-400 group-hover:text-white'
              }`} />
              {hasConnectionIssues && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Navigation Tabs - Scrollable on smaller screens */}
            <div className="flex space-x-1 bg-black/30 backdrop-blur-sm rounded-2xl p-1 border border-white/10 overflow-x-auto max-w-3xl">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 group whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-2xl shadow-purple-500/50'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:block text-sm font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-20 animate-pulse"></div>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-blue-400/0 to-cyan-400/0 group-hover:from-purple-400/10 group-hover:via-blue-400/10 group-hover:to-cyan-400/10 transition-all duration-300"></div>
                  </button>
                );
              })}
            </div>

            {/* Prominent Upgrade Button */}
            <button
              onClick={() => onTabChange('student-upgrade')}
              className={`relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center space-x-2 shadow-2xl hover:shadow-yellow-500/50 ${
                activeTab === 'student-upgrade' ? 'ring-2 ring-yellow-500/50 scale-110' : ''
              }`}
            >
              <Crown className="h-4 w-4" />
              <span className="hidden sm:block">Demo Premium</span>
              {/* Pulsing indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md -z-10"></div>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onAIToggle}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105 relative"
              title="AI Assistant"
            >
              <Bot className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onTabChange('profile')}
                className={`flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 hover:bg-black/50 transition-all ${
                  activeTab === 'profile' ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">Level 12</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;