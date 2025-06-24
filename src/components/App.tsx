import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Skills from './components/Skills';
import Tutorials from './components/Tutorials';
import Marketplace from './components/Marketplace';
import Certificates from './components/Certificates';
import GameTesting from './components/GameTesting';
import GameTestingOpportunities from './components/GameTestingOpportunities';
import Challenges from './components/Challenges';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import StudentUpgrade from './components/StudentUpgrade';
import Community from './components/Community';
import Calendar from './components/Calendar';
import AuthPage from './components/AuthPage';
import SuccessPage from './components/SuccessPage';
import AIAssistant from './components/AIAssistant';
import DemoShowcase from './components/DemoShowcase';
import { supabaseService, type SupabaseUser } from './services/supabase';

interface User {
  name: string;
  email: string;
  subscription?: {
    status: string;
    planName: string;
  };
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check for success page parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  const planId = urlParams.get('plan_id');
  const isSuccessPage = sessionId && planId;

  // Demo mode activation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1' || (e.ctrlKey && e.key === 'd')) {
        e.preventDefault();
        setIsDemoMode(!isDemoMode);
      }
      if (e.key === 'Escape' && isDemoMode) {
        setIsDemoMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoMode]);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const currentUser = await supabaseService.getCurrentUser();
        if (currentUser) {
          const subscription = await supabaseService.getUserSubscription();
          setUser({
            name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
            email: currentUser.email || '',
            subscription: subscription ? {
              status: subscription.subscription_status,
              planName: 'SkillArena Pro' // You can map this from price_id
            } : undefined
          });
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabaseService.onAuthStateChange((user: SupabaseUser | null) => {
      if (user) {
        setUser({
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || ''
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await supabaseService.signOut();
      setUser(null);
      setActiveTab('dashboard');
      setIsDemoMode(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSuccessPageContinue = () => {
    // Clear URL parameters and redirect to dashboard
    window.history.replaceState({}, document.title, window.location.pathname);
    setActiveTab('dashboard');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Smooth scroll to top when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isSuccessPage) {
      return (
        <SuccessPage 
          sessionId={sessionId} 
          planId={planId} 
          onContinue={handleSuccessPageContinue}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={handleTabChange} />;
      case 'skills':
        return <Skills />;
      case 'tutorials':
        return <Tutorials />;
      case 'marketplace':
        return <Marketplace />;
      case 'certificates':
        return <Certificates />;
      case 'game-testing':
        return <GameTesting />;
      case 'game-testing-opportunities':
        return <GameTestingOpportunities />;
      case 'challenges':
        return <Challenges />;
      case 'community':
        return <Community />;
      case 'calendar':
        return <Calendar />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      case 'student-upgrade':
        return <StudentUpgrade />;
      default:
        return <Dashboard onTabChange={handleTabChange} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading SkillArena...</p>
          <p className="text-gray-400 text-sm mt-2">Press F1 for demo mode</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (isSuccessPage) {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(147,51,234,0.1)_0deg,transparent_60deg,rgba(79,70,229,0.1)_120deg,transparent_180deg)] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          user={user}
          onAIToggle={() => setIsAIOpen(!isAIOpen)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} />

      {/* Demo Showcase Overlay */}
      {isDemoMode && (
        <DemoShowcase
          onNavigate={handleTabChange}
          currentTab={activeTab}
        />
      )}

      {/* Demo Mode Activation Hint */}
      {!isDemoMode && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-30 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-2 sm:p-3 text-gray-300 text-xs opacity-75 hover:opacity-100 transition-opacity">
          Press <kbd className="bg-purple-600 text-white px-1 sm:px-2 py-1 rounded text-xs">F1</kbd> for demo mode
        </div>
      )}

      {/* Enhanced Bolt.new Badge - Required for Project */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group transform transition-all duration-300 ease-in-out hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        aria-label="Built with Bolt.new - Open Bolt.new in new tab"
        title="Built with Bolt.new"
      >
        {/* Main Badge Container */}
        <div className="bg-white rounded-full p-2 sm:p-3 shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center space-x-1 sm:space-x-2 min-w-[48px] min-h-[48px] border border-gray-200">
          {/* Bolt.new Logo with Lightning Icon */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              aria-hidden="true"
            >
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
            </svg>
          </div>
          
          {/* Text Label - Hidden on mobile, shown on hover on desktop */}
          <span className="text-gray-800 font-bold text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300 ease-in-out hidden sm:inline-block">
            Bolt.new
          </span>
        </div>

        {/* Enhanced Tooltip */}
        <div className="absolute -top-12 sm:-top-14 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
          <span className="font-medium">Built with Bolt.new</span>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
        </div>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-orange-600 blur-md -z-10"></div>
      </a>

      {/* Accessible Screen Reader Text */}
      <div className="sr-only">
        This project was built using Bolt.new, an AI-powered web development platform.
      </div>
    </div>
  );
}