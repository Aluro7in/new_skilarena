import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Flame, Star, Target } from 'lucide-react';
import { leaderboard } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-400" />;
    return <span className="text-2xl font-bold text-gray-400">#{rank}</span>;
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30';
    return 'bg-gray-800 border-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <div className="flex items-center space-x-2 text-gray-400">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <span>Compete with the best!</span>
        </div>
      </div>

      {/* Leaderboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Your Rank</p>
              <p className="text-2xl font-bold">#3</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Competitors</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Points to #2</p>
              <p className="text-2xl font-bold">2,030</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'weekly', label: 'This Week' },
          { id: 'monthly', label: 'This Month' },
          { id: 'allTime', label: 'All Time' }
        ].map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id as any)}
            className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
              selectedPeriod === period.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((entry) => (
          <div
            key={entry.user.id}
            className={`rounded-xl p-6 border text-center transform hover:scale-105 transition-all duration-200 ${getRankBackground(entry.rank)}`}
          >
            <div className="flex justify-center mb-4">
              {getRankIcon(entry.rank)}
            </div>
            
            <img
              src={entry.user.avatar}
              alt={entry.user.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-purple-500"
            />
            
            <h3 className="text-lg font-bold text-white mb-2">{entry.user.name}</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">XP:</span>
                <span className="text-white font-semibold">{entry.xp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Level:</span>
                <span className="text-purple-400 font-semibold">{entry.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Skills:</span>
                <span className="text-green-400 font-semibold">{entry.skillsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Streak:</span>
                <span className="text-orange-400 font-semibold flex items-center">
                  <Flame className="h-3 w-3 mr-1" />
                  {entry.streak}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Full Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-700">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.user.id}
              className={`px-6 py-4 hover:bg-gray-700 transition-colors ${
                entry.user.id === '1' ? 'bg-purple-900/20 border-l-4 border-purple-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {entry.rank <= 3 ? (
                      getRankIcon(entry.rank)
                    ) : (
                      <span className="text-lg font-bold text-gray-400">#{entry.rank}</span>
                    )}
                  </div>
                  
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div>
                    <h3 className="font-semibold text-white flex items-center">
                      {entry.user.name}
                      {entry.user.id === '1' && (
                        <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">Level {entry.level}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-right">
                    <div className="text-white font-semibold">{entry.xp.toLocaleString()}</div>
                    <div className="text-gray-400">XP</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{entry.skillsCompleted}</div>
                    <div className="text-gray-400">Skills</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-orange-400 font-semibold">
                      <Flame className="h-3 w-3 mr-1" />
                      {entry.streak}
                    </div>
                    <div className="text-gray-400">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Callout */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center">
        <Star className="h-8 w-8 mx-auto mb-3 text-yellow-300" />
        <h3 className="text-xl font-bold mb-2">Climb the Ranks!</h3>
        <p className="text-purple-100 mb-4">Complete more skills and challenges to improve your position</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          View All Challenges
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;