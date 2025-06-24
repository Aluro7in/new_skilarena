import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Monitor, Smartphone, Tablet, Zap, Star, Trophy, Target, Users, BookOpen, TestTube, Award, Calendar, ShoppingCart, MessageSquare } from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  component: string;
  duration: number;
  highlights: string[];
}

interface DemoShowcaseProps {
  onNavigate: (tab: string) => void;
  currentTab: string;
}

const DemoShowcase: React.FC<DemoShowcaseProps> = ({ onNavigate, currentTab }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [autoAdvance, setAutoAdvance] = useState(true);

  const demoSteps: DemoStep[] = [
    {
      id: 'dashboard',
      title: 'Personalized Learning Dashboard',
      description: 'Track your progress, streaks, and achievements in a beautiful, gamified interface',
      component: 'dashboard',
      duration: 5000,
      highlights: [
        'Level progression with XP tracking',
        '7-day learning streak visualization',
        'Quick access to active tutorials and challenges',
        'Achievement badges and statistics'
      ]
    },
    {
      id: 'skills',
      title: 'Interactive Skills Learning',
      description: 'Master programming, game development, and testing through hands-on lessons',
      component: 'skills',
      duration: 6000,
      highlights: [
        'Categorized skill paths with difficulty levels',
        'Progress tracking per skill module',
        'Real-time code editor integration',
        'Instant XP rewards for completion'
      ]
    },
    {
      id: 'tutorials',
      title: 'Immersive Learning Tutorials',
      description: 'Learn through interactive coding exercises and game simulations',
      component: 'tutorials',
      duration: 7000,
      highlights: [
        'Live code editor with syntax highlighting',
        'Interactive game simulations',
        'Step-by-step guided learning',
        'Multiple learning formats (video, coding, projects)'
      ]
    },
    {
      id: 'game-testing',
      title: 'Professional Game Testing',
      description: 'Earn money by testing games for top studios worldwide',
      component: 'game-testing',
      duration: 6000,
      highlights: [
        'Real game testing opportunities',
        'Professional bug reporting tools',
        'Direct partnerships with game studios',
        'Competitive compensation rates'
      ]
    },
    {
      id: 'challenges',
      title: 'Competitive Challenges',
      description: 'Compete with learners globally in timed coding and gaming challenges',
      component: 'challenges',
      duration: 5000,
      highlights: [
        'Real-time competitions with leaderboards',
        'Various difficulty levels and time limits',
        'Substantial XP rewards and recognition',
        'Community-driven challenge creation'
      ]
    },
    {
      id: 'marketplace',
      title: 'Digital Asset Marketplace',
      description: 'Buy and sell game assets, tutorials, and development resources',
      component: 'marketplace',
      duration: 6000,
      highlights: [
        'High-quality 3D models and game assets',
        'Professional tutorial courses',
        'Community-created content',
        'Secure payment processing'
      ]
    },
    {
      id: 'certificates',
      title: 'Verifiable Credentials',
      description: 'Earn industry-recognized certificates that showcase your expertise',
      component: 'certificates',
      duration: 5000,
      highlights: [
        'Blockchain-verified certificates',
        'Industry partner recognition',
        'Professional portfolio integration',
        'Shareable digital credentials'
      ]
    },
    {
      id: 'student-upgrade',
      title: 'Premium Subscriptions',
      description: 'Unlock advanced features and exclusive opportunities',
      component: 'student-upgrade',
      duration: 6000,
      highlights: [
        'Tiered subscription plans',
        'Exclusive studio partnerships',
        'Priority support and mentoring',
        'Advanced analytics and reporting'
      ]
    }
  ];

  useEffect(() => {
    if (isPlaying && autoAdvance) {
      const timer = setTimeout(() => {
        const nextStep = (currentStep + 1) % demoSteps.length;
        setCurrentStep(nextStep);
        onNavigate(demoSteps[nextStep].component);
      }, demoSteps[currentStep].duration);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, autoAdvance, demoSteps, onNavigate]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    onNavigate(demoSteps[stepIndex].component);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    onNavigate(demoSteps[0].component);
  };

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-4xl mx-auto';
      default:
        return 'w-full';
    }
  };

  const currentStepData = demoSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / demoSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col">
      {/* Demo Controls Header */}
      <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SkillArena Demo</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-all transform hover:scale-105"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button
                onClick={resetDemo}
                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-all transform hover:scale-105"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center space-x-1 bg-black/20 rounded-lg p-1">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-2 rounded transition-all ${deviceView === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-2 rounded transition-all ${deviceView === 'tablet' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-2 rounded transition-all ${deviceView === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white font-semibold">{currentStepData.title}</div>
              <div className="text-purple-300 text-sm">Step {currentStep + 1} of {demoSteps.length}</div>
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Side Panel with Step Navigation */}
        <div className="w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">{currentStepData.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{currentStepData.description}</p>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold text-purple-400">Key Features:</div>
                {currentStepData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <Zap className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Demo Steps</div>
              {demoSteps.map((step, index) => {
                const StepIcon = {
                  dashboard: Target,
                  skills: BookOpen,
                  tutorials: Play,
                  'game-testing': TestTube,
                  challenges: Trophy,
                  marketplace: ShoppingCart,
                  certificates: Award,
                  'student-upgrade': Star,
                  community: MessageSquare,
                  calendar: Calendar
                }[step.component] || Target;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all transform hover:scale-105 ${
                      currentStep === index
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-black/20 text-gray-300 hover:bg-black/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <StepIcon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-75">{step.duration / 1000}s demo</div>
                      </div>
                      {currentStep === index && isPlaying && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Demo Viewport */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          <div className={`h-full transition-all duration-300 ${getDeviceClass()}`}>
            <div className="h-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
              {/* This is where the actual app content will be rendered */}
              <div className="h-full overflow-y-auto">
                {/* The main app content will be rendered here through the parent component */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Footer with Quick Stats */}
      <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">50K+ Active Learners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300">1M+ Skills Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <TestTube className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">500+ Partner Studios</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-gray-300">10K+ Certificates Issued</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-300 text-sm">Auto-advance</span>
            </label>
            <div className="text-gray-400 text-sm">
              Press ESC to exit demo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoShowcase;