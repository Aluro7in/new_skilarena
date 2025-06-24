import React, { useState } from 'react';
import { Code, FileType, Server, Palette, BarChart3, Cog, Clock, Trophy, Star, ChevronRight } from 'lucide-react';
import { skills } from '../data/mockData';
import { Skill } from '../types';

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Code, FileType, Server, Palette, BarChart3, Cog
    };
    return icons[iconName] || Code;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-orange-600';
      case 'Expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  if (selectedSkill) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedSkill(null)}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
          Back to Skills
        </button>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                {React.createElement(getIcon(selectedSkill.icon), { className: 'h-8 w-8 text-white' })}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedSkill.title}</h1>
                <p className="text-gray-400 mt-1">{selectedSkill.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(selectedSkill.difficulty)}`}>
                {selectedSkill.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400">Duration</div>
              <div className="text-white font-semibold">{selectedSkill.estimatedTime}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400">XP Reward</div>
              <div className="text-white font-semibold">{selectedSkill.xpReward}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Star className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400">Progress</div>
              <div className="text-white font-semibold">{selectedSkill.progress}%</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Code className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm text-gray-400">Lessons</div>
              <div className="text-white font-semibold">{selectedSkill.lessons.length}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>{selectedSkill.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${selectedSkill.progress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Lessons</h3>
            <div className="space-y-3">
              {selectedSkill.lessons.map((lesson, index) => (
                <div key={lesson.id} className={`border rounded-lg p-4 transition-colors ${
                  lesson.completed 
                    ? 'bg-green-900 border-green-700' 
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        lesson.completed ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{lesson.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="capitalize">{lesson.type}</span>
                          <span>{lesson.duration}</span>
                          <span>+{lesson.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                    {lesson.completed && (
                      <div className="text-green-400">
                        <Trophy className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              {selectedSkill.completed ? 'Review Skill' : selectedSkill.progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <div className="text-gray-400">
          {filteredSkills.length} skills available
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const Icon = getIcon(skill.icon);
          return (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(skill.difficulty)}`}>
                  {skill.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{skill.description}</p>

              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {skill.estimatedTime}
                </span>
                <span className="flex items-center text-yellow-400">
                  <Trophy className="h-4 w-4 mr-1" />
                  {skill.xpReward} XP
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      skill.completed 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  skill.completed 
                    ? 'bg-green-600 text-white'
                    : skill.progress > 0
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  {skill.completed ? 'Completed' : skill.progress > 0 ? 'In Progress' : 'Start Learning'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;