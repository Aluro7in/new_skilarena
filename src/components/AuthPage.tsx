import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Star, Gamepad2, Trophy, Target, Timer, Loader, AlertCircle } from 'lucide-react';
import { supabaseService } from '../services/supabase';

interface AuthPageProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showTrial, setShowTrial] = useState(false);
  const [trialAttempts, setTrialAttempts] = useState(0);
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('savedFirstName') || '',
    lastName: localStorage.getItem('savedLastName') || '',
    email: localStorage.getItem('savedEmail') || '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );

  useEffect(() => {
    // Check trial session
    const trialData = localStorage.getItem('skillArenaTrialSession');
    if (trialData) {
      const trial = JSON.parse(trialData);
      if (new Date(trial.expiresAt) > new Date()) {
        setTrialAttempts(trial.attempts);
      } else {
        localStorage.removeItem('skillArenaTrialSession');
      }
    }

    // Check for existing session
    checkExistingSession();
  }, []);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => {
      setNetworkStatus('offline');
      setError('You are currently offline. Some features may not work properly.');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkExistingSession = async () => {
    try {
      const session = await supabaseService.getSession();
      if (session?.user) {
        onLogin({
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || ''
        });
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
    setIsLoading(false);
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        setError('Please enter your first name');
        return false;
      }
      if (!formData.lastName.trim()) {
        setError('Please enter your last name');
        return false;
      }
      if (formData.firstName.trim().length < 2) {
        setError('First name must be at least 2 characters long');
        return false;
      }
      if (formData.lastName.trim().length < 2) {
        setError('Last name must be at least 2 characters long');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Save non-sensitive form data for convenience (excluding password)
    if (!isLogin) {
      localStorage.setItem('savedFirstName', formData.firstName.trim());
      localStorage.setItem('savedLastName', formData.lastName.trim());
    }
    localStorage.setItem('savedEmail', formData.email.trim());

    try {
      if (networkStatus === 'offline') {
        // Special handling for offline mode
        setTimeout(() => {
          setError('Cannot sign in while offline. Please check your internet connection and try again.');
          setIsLoading(false);
        }, 1500);
        return;
      }

      if (isLogin) {
        const { user } = await supabaseService.signIn(formData.email.trim(), formData.password);
        if (user) {
          onLogin({
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || ''
          });
          localStorage.removeItem('savedFirstName');
          localStorage.removeItem('savedLastName');
        }
      } else {
        const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
        const { user } = await supabaseService.signUp(
          formData.email.trim(), 
          formData.password, 
          fullName
        );
        
        if (user) {
          if (user.email_confirmed_at) {
            // User is immediately confirmed
            onLogin({
              name: fullName || user.email?.split('@')[0] || 'User',
              email: user.email || ''
            });
            localStorage.removeItem('savedFirstName');
            localStorage.removeItem('savedLastName');
          } else {
            // Email confirmation required
            setMessage('Please check your email and click the confirmation link to complete your registration.');
            setIsLogin(true);
            setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
          }
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      // Network connectivity check
      if (!navigator.onLine || err.message?.includes('offline') || err.message?.includes('fetch')) {
        setError('Network connection issue. Please check your internet connection and try again.');
      }
      // API server unreachable
      else if (err.message?.includes('CORS') || err.message?.includes('Failed to')) {
        setError('Unable to reach authentication server. Please try again later or contact support.');
      }
      // Other errors
      // Provide more user-friendly error messages
      if (err.message?.includes('fetch') || !navigator.onLine) {
        setError('Network connection error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrialAccess = () => {
    const currentAttempts = trialAttempts + 1;
    const trialSession = {
      sessionId: Date.now().toString(),
      attempts: currentAttempts,
      maxAttempts: 3,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
    
    localStorage.setItem('skillArenaTrialSession', JSON.stringify(trialSession));
    setTrialAttempts(currentAttempts);
    
    // Temporary trial user
    onLogin({
      name: `Trial User ${currentAttempts}`,
      email: 'trial@skillarena.com'
    });
  };

  const handleDemoLogin = () => {
    onLogin({ name: 'Demo User', email: 'demo@example.com' });
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const stats = [
    { icon: User, value: '50K+', label: 'Active Learners' },
    { icon: Trophy, value: '1M+', label: 'Skills Completed' },
    { icon: Target, value: '500+', label: 'Partner Studios' },
    { icon: Gamepad2, value: '10K+', label: 'Games Tested' }
  ];

  const canUseTrial = trialAttempts < 3;

  // Show network status indicator
  const isOffline = networkStatus === 'offline';

  if (isLoading && !formData.email) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(147,51,234,0.1)_0deg,transparent_60deg,rgba(79,70,229,0.1)_120deg,transparent_180deg)] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Network Status Indicator */}
        {isOffline && (
          <div className="fixed top-4 right-4 bg-red-600/90 text-white py-2 px-4 rounded-lg flex items-center shadow-lg animate-pulse z-50">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-6.364 0a3 3 0 000-4.243m0-6.364a3 3 0 00-4.243 4.243m4.242-4.242L18.364 5.636" />
            </svg>
            <span className="text-sm font-medium">Offline Mode</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
              <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-3 rounded-xl shadow-2xl">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SkillArena
                </span>
                <div className="text-sm text-gray-400">Level Up Your Skills</div>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-6">
              Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                Gaming Passion
              </span>
              Into a Career
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Join the world's largest gamified learning platform. Master skills, test games, and connect with top studios worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                    <Icon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">What you'll get:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Access to 500+ premium skills and tutorials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Digital marketplace for game assets</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Verifiable certificates and credentials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Earn money through game testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form or Network Error */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back!' : 'Join SkillArena'}
                  </h2>
                  <p className="text-gray-400">
                    {isLogin ? 'Sign in to continue your journey' : 'Start your learning adventure today'}
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-6 bg-red-600/20 border border-red-500/30 rounded-xl p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="mb-6 bg-green-600/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm">{message}</p>
                  </div>
                )}

                {/* Trial Option */}
                {canUseTrial && (
                  <div className="mb-6 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Timer className="h-5 w-5 text-orange-400" />
                        <span className="text-orange-300 font-semibold">Try Before You Sign Up</span>
                      </div>
                      <span className="text-xs bg-orange-600/30 text-orange-200 px-2 py-1 rounded-full">
                        {3 - trialAttempts} left
                      </span>
                    </div>
                    <p className="text-orange-200 text-sm mb-3">
                      Explore SkillArena with limited access. No signup required!
                    </p>
                    <button
                      onClick={handleTrialAccess}
                      className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Start Free Trial
                    </button>
                  </div>
                )}

                {trialAttempts >= 3 && (
                  <div className="mb-6 bg-red-600/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 text-center">
                    <p className="text-red-300 text-sm">
                      Trial limit reached. Please sign up to continue exploring SkillArena.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            required={!isLogin}
                          />
                        </div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                      <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3">
                        <p className="text-blue-300 text-xs">
                          <strong>Required:</strong> Your full name will be displayed across your dashboard and certificates. Please use your real name as it appears on official documents.
                        </p>
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {!isLogin && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required={!isLogin}
                      />
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded bg-black/30 border-white/10 text-purple-600 focus:ring-purple-500/20" />
                        <span className="text-gray-400 text-sm">Remember me</span>
                      </label>
                      <button type="button" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                      </div>
                    ) : (
                      isLogin ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>

                {isOffline && (
                  <div className="mt-6 mb-6 bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <p className="text-yellow-300 text-sm mb-3">
                      You appear to be offline. Authentication requires an internet connection.
                    </p>
                    <button
                      onClick={handleDemoLogin}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                    >
                      Continue in Demo Mode
                    </button>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => {
                        // Reset form when switching modes
                        setIsLogin(!isLogin);
                        setError(isOffline ? "You're currently offline. Some features may be limited." : null);
                        // Keep the email when switching modes
                        const email = formData.email;
                        setMessage(null);
                        setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
                      }}
                      className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>Trusted by 50K+ learners</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;