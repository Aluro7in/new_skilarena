import React from 'react';
import { Trophy, Flame, Target, TrendingUp, Star, Zap, GraduationCap, TestTube, Gamepad2, Play, ArrowRight, Crown, Sparkles, Video, Mic, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { currentUser, skills, challenges, tutorials, gameTests } from '../data/mockData';
import { openaiService } from '../services/openai';

interface DashboardProps {
  onTabChange: (tab: string) => void;
  onAIToggle?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTabChange, onAIToggle = () => {} }) => {
  const completedSkills = skills.filter(skill => skill.completed);
  const inProgressSkills = skills.filter(skill => skill.progress > 0 && !skill.completed);
  const activeChallenges = challenges.filter(challenge => challenge.status === 'active');
  const activeTutorials = tutorials.filter(tutorial => tutorial.progress > 0 && !tutorial.completed);
  const activeGameTests = gameTests.filter(test => test.status === 'active');

  const xpProgress = (currentUser.xp / 1000) * 100;
  const nextLevel = currentUser.level + 1;
  const xpToNextLevel = 1000 - currentUser.xp;

  // Check if user is a trial user
  const isTrialUser = currentUser.name.includes('Trial User') || currentUser.email === 'trial@skillarena.com';
  
  // Get clean user name (remove trial suffix if present)
  const getDisplayName = (name: string) => {
    if (name.includes('Trial User')) {
      return name.replace(/\s*Trial User\s*\d*/, '').trim() || 'Trial User';
    }
    return name;
  };

  const displayName = getDisplayName(currentUser.name);

  const handleTutorialClick = (tutorialId: string) => {
    sessionStorage.setItem('selectedTutorialId', tutorialId);
    onTabChange('tutorials');
  };

  const handleSkillClick = (skillId: string) => {
    sessionStorage.setItem('selectedSkillId', skillId);
    onTabChange('skills');
  };

  const handleChallengeClick = (challengeId: string) => {
    sessionStorage.setItem('selectedChallengeId', challengeId);
    onTabChange('challenges');
  };

  const handleGameTestClick = (testId: string) => {
    sessionStorage.setItem('selectedGameTestId', testId);
    onTabChange('game-testing');
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Section with Conditional Message */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Conditional Welcome Message */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
                {isTrialUser ? (
                  <Zap className="h-8 w-8 text-yellow-300" />
                ) : (
                  <Sparkles className="h-8 w-8 text-yellow-300" />
                )}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Welcome
            </h1>
            
            <div className="text-3xl md:text-4xl font-semibold text-white/95 mb-3">
              {isTrialUser ? (
                <>
                  {displayName}
                  <span className="text-2xl md:text-3xl text-yellow-300 font-normal ml-2">(Trial User)</span>
                </>
              ) : (
                displayName
              )}
            </div>
            
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
              {isTrialUser ? (
                <>
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-white font-medium">Trial Experience</span>
                </>
              ) : (
                <>
                  <Crown className="h-5 w-5 text-yellow-300" />
                  <span className="text-white font-medium">Level {currentUser.level} Learner</span>
                </>
              )}
            </div>
          </div>

          {/* Trial-specific messaging */}
          {isTrialUser && (
            <div className="text-center mb-6">
              <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30 max-w-md mx-auto">
                <p className="text-yellow-200 text-sm font-medium">
                  🌟 You're exploring SkillArena! 
                </p>
                <p className="text-yellow-100 text-xs mt-1">
                  Sign up for full access to all features and progress tracking
                </p>
              </div>
            </div>
          )}

          {/* User Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Flame className="h-5 w-5 text-orange-300" />
                <span className="text-2xl font-bold text-white">
                  {isTrialUser ? '-' : currentUser.streak}
                </span>
              </div>
              <div className="text-purple-200 text-sm">Day Streak</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Trophy className="h-5 w-5 text-yellow-300" />
                <span className="text-2xl font-bold text-white">
                  {isTrialUser ? '-' : currentUser.badges.length}
                </span>
              </div>
              <div className="text-purple-200 text-sm">Badges</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Target className="h-5 w-5 text-blue-300" />
                <span className="text-2xl font-bold text-white">
                  {isTrialUser ? '-' : currentUser.totalXp.toLocaleString()}
                </span>
              </div>
              <div className="text-purple-200 text-sm">Total XP</div>
            </div>
          </div>

          {/* Progress to Next Level (Hidden for trial users) */}
          {!isTrialUser && (
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-purple-200 mb-2">
                <span>Progress to Level {nextLevel}</span>
                <span>{currentUser.xp}/1000 XP</span>
              </div>
              <div className="w-full bg-purple-800/50 rounded-full h-4 overflow-hidden border border-white/20">
                <div 
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${xpProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="text-center mt-2 text-purple-200 text-sm">
                {xpToNextLevel} XP until Level {nextLevel}
              </div>
            </div>
          )}

          {/* Motivational Message */}
          <div className="text-center mt-6">
            <p className="text-lg text-purple-100 font-medium">
              {isTrialUser 
                ? "Explore the future of gamified learning!"
                : "Ready to level up your skills today?"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Trial-specific Upgrade Banner */}
      {isTrialUser ? (
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Love what you see?</h3>
                <p className="text-yellow-200">Sign up now to save your progress and unlock all features!</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()} // This would trigger the auth page
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Crown className="h-5 w-5" />
                <span>Sign Up Now</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Upgrade Promotion Banner for signed-in users */
        <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-red-500/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Unlock Your Full Potential</h3>
                <p className="text-yellow-200">Get unlimited access to premium skills, exclusive game testing, and professional certificates</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onTabChange('student-upgrade')}
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Crown className="h-5 w-5" />
                <span>Upgrade Now</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Completion Showcase */}
      <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300 font-semibold">Challenge Completed</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
            AI-Powered Platform Integration
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Successfully integrated cutting-edge AI technologies and deployed a production-ready gamified learning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Video AI Challenge */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Video className="h-8 w-8 text-white" />
              </div>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Conversational AI Video</h3>
            <p className="text-gray-400 text-sm mb-4">
              Real-time AI video agents powered by Tavus for immersive learning experiences
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Real-time video conversations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Multiple AI avatar personalities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Interactive video call controls</span>
              </div>
            </div>
            <button 
              onClick={onAIToggle}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Video className="h-4 w-4" />
              <span>Try Video AI</span>
              {openaiService.isApiConfigured() && (
                <span className="ml-1 bg-green-500/20 text-green-400 text-[10px] px-1.5 rounded-full border border-green-500/20">Live</span>
              )}
            </button>
          </div>

          {/* Voice AI Challenge */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Voice AI Integration</h3>
            <p className="text-gray-400 text-sm mb-4">
              Natural voice conversations with ElevenLabs premium voice synthesis
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>High-quality text-to-speech</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Speech recognition & processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Multiple AI voice personalities</span>
              </div>
            </div>
            <button 
              onClick={onAIToggle}
              className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mic className="h-4 w-4" />
              <span>Try Voice AI</span>
              {openaiService.isApiConfigured() && (
                <span className="ml-1 bg-green-500/20 text-green-400 text-[10px] px-1.5 rounded-full border border-green-500/20">Live</span>
              )}
            </button>
          </div>

          {/* Deploy Challenge */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Production Deployment</h3>
            <p className="text-gray-400 text-sm mb-4">
              Full-stack application deployed on Netlify with optimized performance
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Automatic CI/CD deployment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>CDN optimization & caching</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Environment management</span>
              </div>
            </div>
            <a 
              href={window.location.origin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>View Live Site</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Technical Achievements */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6 text-center">🏆 Technical Achievements Unlocked</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-purple-600/20 rounded-full p-3 w-fit mx-auto mb-2">
                <Video className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-sm font-semibold text-white">Tavus Integration</div>
              <div className="text-xs text-gray-400">Real-time Video AI</div>
            </div>
            <div className="text-center">
              <div className="bg-green-600/20 rounded-full p-3 w-fit mx-auto mb-2">
                <Mic className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-sm font-semibold text-white">ElevenLabs API</div>
              <div className="text-xs text-gray-400">Voice Synthesis</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/20 rounded-full p-3 w-fit mx-auto mb-2">
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-sm font-semibold text-white">Netlify Deploy</div>
              <div className="text-xs text-gray-400">Production Ready</div>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600/20 rounded-full p-3 w-fit mx-auto mb-2">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-sm font-semibold text-white">Multi-Modal AI</div>
              <div className="text-xs text-gray-400">Text, Voice, Video</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-orange-400">
                {isTrialUser ? '-' : `${currentUser.streak} days`}
              </p>
            </div>
            <div className="bg-orange-400/20 p-3 rounded-lg">
              <Flame className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Skills Completed</p>
              <p className="text-2xl font-bold text-green-400">
                {isTrialUser ? '-' : completedSkills.length}
              </p>
            </div>
            <div className="bg-green-400/20 p-3 rounded-lg">
              <Trophy className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total XP</p>
              <p className="text-2xl font-bold text-blue-400">
                {isTrialUser ? '-' : currentUser.totalXp.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-400/20 p-3 rounded-lg">
              <Star className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Badges Earned</p>
              <p className="text-2xl font-bold text-purple-400">
                {isTrialUser ? '-' : currentUser.badges.length}
              </p>
            </div>
            <div className="bg-purple-400/20 p-3 rounded-lg">
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {isTrialUser ? 'Explore Learning Paths' : 'Continue Learning'}
              </h2>
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            
            <div className="space-y-4">
              {inProgressSkills.slice(0, 3).map((skill) => (
                <div 
                  key={skill.id} 
                  onClick={() => handleSkillClick(skill.id)}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all cursor-pointer group transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors flex items-center">
                      {skill.title}
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                      {skill.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{isTrialUser ? 'Preview Available' : `${skill.progress}% Complete`}</span>
                    <span>+{skill.xpReward} XP</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${isTrialUser ? 0 : skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tutorials */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {isTrialUser ? 'Featured Tutorials' : 'Active Tutorials'}
              </h2>
              <GraduationCap className="h-5 w-5 text-cyan-400" />
            </div>
            
            <div className="space-y-4">
              {activeTutorials.slice(0, 2).map((tutorial) => (
                <div 
                  key={tutorial.id} 
                  onClick={() => handleTutorialClick(tutorial.id)}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all cursor-pointer group transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center">
                      {tutorial.title}
                      <Play className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded-full">
                      {tutorial.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{tutorial.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {isTrialUser ? 'Preview Available' : `${tutorial.progress}% Complete`}
                    </span>
                    <span className="text-yellow-400 font-semibold">+{tutorial.xpReward} XP</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${isTrialUser ? 0 : tutorial.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Challenges */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {isTrialUser ? 'Available Challenges' : 'Active Challenges'}
              </h2>
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            
            <div className="space-y-4">
              {activeChallenges.slice(0, 2).map((challenge) => (
                <div 
                  key={challenge.id} 
                  onClick={() => handleChallengeClick(challenge.id)}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all cursor-pointer group transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-yellow-300 transition-colors flex items-center">
                      {challenge.title}
                      <Zap className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      challenge.difficulty === 'Easy' ? 'bg-green-600 text-white' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
                      challenge.difficulty === 'Hard' ? 'bg-red-600 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{challenge.participants} participants</span>
                    <span className="text-yellow-400 font-semibold">+{challenge.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Testing */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Game Testing</h2>
              <TestTube className="h-5 w-5 text-cyan-400" />
            </div>
            
            <div className="space-y-4">
              {activeGameTests.slice(0, 2).map((test) => (
                <div 
                  key={test.id} 
                  onClick={() => handleGameTestClick(test.id)}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all cursor-pointer group transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center">
                      {test.title}
                      <Gamepad2 className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded-full">
                      {test.gameType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{test.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {isTrialUser ? 'Sign up to participate' : `${test.bugsFound} bugs found`}
                    </span>
                    <span className="text-yellow-400 font-semibold">+{test.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements (Hidden for trial users) */}
      {!isTrialUser && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentUser.badges.map((badge) => (
              <div key={badge.id} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-all cursor-pointer transform hover:scale-105">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                  badge.rarity === 'Common' ? 'bg-gray-600' :
                  badge.rarity === 'Rare' ? 'bg-blue-600' :
                  badge.rarity === 'Epic' ? 'bg-purple-600' :
                  'bg-yellow-600'
                }`}>
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm">{badge.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{badge.rarity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={() => onTabChange('tutorials')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <GraduationCap className="h-8 w-8 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">
            {isTrialUser ? 'Preview Tutorial' : 'New Tutorial'}
          </h3>
          <p className="text-purple-100 text-sm">
            {isTrialUser ? 'Explore learning content' : 'Start learning something new'}
          </p>
        </button>

        <button
          onClick={() => onTabChange('game-testing')}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white text-center cursor-pointer hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <TestTube className="h-8 w-8 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Test Games</h3>
          <p className="text-cyan-100 text-sm">
            {isTrialUser ? 'Discover opportunities' : 'Help improve gaming experiences'}
          </p>
        </button>

        <button
          onClick={() => onTabChange('challenges')}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-6 text-white text-center cursor-pointer hover:from-yellow-700 hover:to-orange-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <Zap className="h-8 w-8 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">
            {isTrialUser ? 'View Challenges' : 'Join Challenge'}
          </h3>
          <p className="text-yellow-100 text-sm">
            {isTrialUser ? 'See what awaits you' : 'Compete with other learners'}
          </p>
        </button>

        <button
          onClick={() => isTrialUser ? window.location.reload() : onTabChange('student-upgrade')}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-xl p-6 text-white text-center cursor-pointer hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20 animate-pulse"></div>
          <div className="relative">
            <Crown className="h-8 w-8 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">
              {isTrialUser ? 'Sign Up Now' : 'Upgrade Premium'}
            </h3>
            <p className="text-yellow-100 text-sm">
              {isTrialUser ? 'Save your progress' : 'Unlock all features'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;