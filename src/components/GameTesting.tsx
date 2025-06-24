import React, { useState } from 'react';
import { TestTube, Trophy, Target, Bug, Clock, Users, Star, CheckCircle, AlertCircle, Calendar, Zap } from 'lucide-react';
import { gameTests, currentUser } from '../data/mockData';

const GameTesting: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const filteredTests = gameTests.filter(test => {
    if (selectedTab === 'active') return test.status === 'active';
    if (selectedTab === 'upcoming') return test.status === 'upcoming';
    return test.status === 'completed';
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('Mobile')) return '📱';
    if (platform.includes('Console')) return '🎮';
    return '💻';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Game Testing</h1>
          <p className="text-gray-400 mt-1">Help shape the future of gaming through quality assurance</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <TestTube className="h-5 w-5 text-cyan-400" />
          <span>Professional Testing Platform</span>
        </div>
      </div>

      {/* Game Testing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100 text-sm">Bugs Reported</p>
              <p className="text-2xl font-bold">{currentUser.gameTestingStats.totalBugReports}</p>
            </div>
            <Bug className="h-8 w-8 text-cyan-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Valid Bugs</p>
              <p className="text-2xl font-bold">{currentUser.gameTestingStats.validBugs}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Games Tested</p>
              <p className="text-2xl font-bold">{currentUser.gameTestingStats.totalGamesInvolved}</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Feedback Score</p>
              <p className="text-2xl font-bold">{currentUser.gameTestingStats.feedbackScore}/5.0</p>
            </div>
            <Star className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Your Testing Specializations</h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.gameTestingStats.specializations.map((spec, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'active', label: 'Active Tests', count: gameTests.filter(t => t.status === 'active').length },
          { id: 'upcoming', label: 'Upcoming', count: gameTests.filter(t => t.status === 'upcoming').length },
          { id: 'completed', label: 'Completed', count: 12 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Game Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg text-2xl">
                  {getPlatformIcon(test.platform)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{test.title}</h3>
                  <p className="text-gray-400 text-sm">{test.gameType} • {test.developer}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
                <div className="text-xs text-gray-400 mt-1">{test.platform}</div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{test.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Testing Period</span>
                </div>
                <p className="text-white font-semibold">{test.testingPeriod}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Bug className="h-4 w-4" />
                  <span className="text-sm">Bugs Found</span>
                </div>
                <p className="text-white font-semibold">{test.bugsFound}</p>
              </div>
            </div>

            {/* Testing Areas */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Testing Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {test.testingAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Trophy className="h-4 w-4" />
                <span className="font-semibold">+{test.xpReward} XP</span>
              </div>
              {test.feedbackSubmitted && (
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Feedback Submitted</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              {test.status === 'active' && (
                <>
                  <button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                    {test.bugsFound > 0 ? 'Continue Testing' : 'Start Testing'}
                  </button>
                  {test.bugsFound > 0 && (
                    <button className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                      <AlertCircle className="h-4 w-4" />
                    </button>
                  )}
                </>
              )}
              {test.status === 'upcoming' && (
                <button className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Notify Me</span>
                </button>
              )}
              {test.status === 'completed' && (
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg opacity-75 cursor-not-allowed">
                  Testing Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-12">
          <TestTube className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tests available</h3>
          <p className="text-gray-500">Check back later for new testing opportunities!</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white text-center">
        <Zap className="h-8 w-8 mx-auto mb-3 text-cyan-200" />
        <h3 className="text-xl font-bold mb-2">Level Up Your Testing Skills!</h3>
        <p className="text-cyan-100 mb-4">Join our community of professional game testers and help create better gaming experiences</p>
        <button className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          View All Opportunities
        </button>
      </div>
    </div>
  );
};

export default GameTesting;