import React, { useState } from 'react';
import { Sword, Clock, Users, Trophy, Calendar, Zap, Target, Star } from 'lucide-react';
import { challenges } from '../data/mockData';

const Challenges: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  const filteredChallenges = challenges.filter(challenge => {
    if (selectedTab === 'active') return challenge.status === 'active';
    if (selectedTab === 'upcoming') return challenge.status === 'upcoming';
    return challenge.status === 'completed';
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Hard': return 'bg-red-600';
      case 'Expert': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Ends today';
    if (days === 1) return 'Ends tomorrow';
    if (days > 1) return `${days} days left`;
    return 'Ended';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Challenges</h1>
        <div className="flex items-center space-x-2 text-gray-400">
          <Zap className="h-5 w-5 text-yellow-400" />
          <span>Compete and Level Up!</span>
        </div>
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Challenges Won</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Trophy className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Participants</p>
              <p className="text-2xl font-bold">2,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">XP from Challenges</p>
              <p className="text-2xl font-bold">4,250</p>
            </div>
            <Star className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'active', label: 'Active', count: challenges.filter(c => c.status === 'active').length },
          { id: 'upcoming', label: 'Upcoming', count: challenges.filter(c => c.status === 'upcoming').length },
          { id: 'completed', label: 'Completed', count: 8 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              selectedTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 transform hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                  <Sword className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm">{challenge.category}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            <p className="text-gray-300 mb-4">{challenge.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Time Limit</span>
                </div>
                <p className="text-white font-semibold">{challenge.timeLimit}</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Participants</span>
                </div>
                <p className="text-white font-semibold">{challenge.participants}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDeadline(challenge.deadline)}</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Trophy className="h-4 w-4" />
                <span className="font-semibold">+{challenge.xpReward} XP</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {challenge.status === 'active' && (
                <>
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                    Join Challenge
                  </button>
                  <button className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    <Target className="h-4 w-4" />
                  </button>
                </>
              )}
              {challenge.status === 'upcoming' && (
                <button className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                  Notify Me
                </button>
              )}
              {challenge.status === 'completed' && (
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg opacity-75 cursor-not-allowed">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <Sword className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No challenges available</h3>
          <p className="text-gray-500">Check back later for new challenges!</p>
        </div>
      )}
    </div>
  );
};

export default Challenges;