import React, { useState } from 'react';
import { User, Edit, Trophy, Star, Calendar, Flame, Target, BookOpen, Award, Settings, LogOut } from 'lucide-react';
import { currentUser, skills } from '../data/mockData';

interface ProfileProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'stats' | 'settings'>('overview');

  const completedSkills = skills.filter(skill => skill.completed);
  const totalLessons = skills.reduce((acc, skill) => acc + skill.lessons.length, 0);
  const completedLessons = skills.reduce((acc, skill) => 
    acc + skill.lessons.filter(lesson => lesson.completed).length, 0
  );

  const stats = [
    { label: 'Skills Completed', value: completedSkills.length, icon: BookOpen, color: 'text-green-400' },
    { label: 'Current Level', value: currentUser.level, icon: Star, color: 'text-purple-400' },
    { label: 'Current Streak', value: `${currentUser.streak} days`, icon: Flame, color: 'text-orange-400' },
    { label: 'Total XP', value: currentUser.totalXp.toLocaleString(), icon: Target, color: 'text-blue-400' },
    { label: 'Badges Earned', value: currentUser.badges.length, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Lessons Completed', value: `${completedLessons}/${totalLessons}`, icon: Award, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full">
              {currentUser.level}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-purple-100 mb-2">Level {currentUser.level} Learner</p>
            <p className="text-purple-200 text-sm mb-2">{user.email}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Flame className="h-4 w-4 text-orange-300" />
                <span>{currentUser.streak} day streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-300" />
                <span>{currentUser.badges.length} badges</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4 text-blue-300" />
                <span>{currentUser.totalXp.toLocaleString()} total XP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-purple-200 mb-1">
            <span>Progress to Level {currentUser.level + 1}</span>
            <span>{currentUser.xp}/1000 XP</span>
          </div>
          <div className="w-full bg-purple-800/50 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentUser.xp / 1000) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'stats', label: 'Statistics', icon: Target },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Completed', item: 'Python Data Science', time: '2 hours ago', color: 'text-green-400' },
                { action: 'Started', item: 'DevOps Fundamentals', time: '1 day ago', color: 'text-blue-400' },
                { action: 'Earned Badge', item: 'Streak Master', time: '2 days ago', color: 'text-purple-400' },
                { action: 'Completed', item: 'TypeScript Mastery', time: '3 days ago', color: 'text-green-400' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <div>
                    <span className={`font-semibold ${activity.color}`}>{activity.action}</span>
                    <span className="text-white ml-1">{activity.item}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Earned Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentUser.badges.map((badge) => (
                <div key={badge.id} className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                    badge.rarity === 'Common' ? 'bg-gray-600' :
                    badge.rarity === 'Rare' ? 'bg-blue-600' :
                    badge.rarity === 'Epic' ? 'bg-purple-600' :
                    'bg-yellow-600'
                  }`}>
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    badge.rarity === 'Common' ? 'bg-gray-600 text-white' :
                    badge.rarity === 'Rare' ? 'bg-blue-600 text-white' :
                    badge.rarity === 'Epic' ? 'bg-purple-600 text-white' :
                    'bg-yellow-600 text-white'
                  }`}>
                    {badge.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Available Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Speed Demon', description: 'Complete 5 challenges in one day', rarity: 'Rare' },
                { name: 'Knowledge Seeker', description: 'Complete 25 skills', rarity: 'Epic' },
                { name: 'Master Learner', description: 'Reach Level 25', rarity: 'Legendary' },
                { name: 'Community Helper', description: 'Help 10 other learners', rarity: 'Rare' }
              ].map((badge, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4 text-center opacity-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-gray-600">
                    <Trophy className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="font-bold text-gray-400 mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{badge.description}</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-400">
                    {badge.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
              <input
                type="text"
                value={user.name}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                readOnly
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-gray-400">Email notifications for new challenges</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-gray-400">Daily learning reminders</span>
              </label>
            </div>

            <div className="pt-4 flex space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                Save Changes
              </button>
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;