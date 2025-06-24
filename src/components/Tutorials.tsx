import React, { useState, useEffect } from 'react';
import { GraduationCap, Clock, Trophy, Star, ChevronRight, Code2, Play, Terminal, Palette, Brain, TestTube, Gamepad2, CreditCard } from 'lucide-react';
import { tutorials } from '../data/mockData';
import { Tutorial } from '../types';
import { stripeService } from '../services/stripe';

const Tutorials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [activeModule, setActiveModule] = useState(0);

  // Check if a tutorial was selected from the dashboard
  useEffect(() => {
    const selectedTutorialId = sessionStorage.getItem('selectedTutorialId');
    if (selectedTutorialId) {
      const tutorial = tutorials.find(t => t.id === selectedTutorialId);
      if (tutorial) {
        setSelectedTutorial(tutorial);
        sessionStorage.removeItem('selectedTutorialId');
      }
    }
  }, []);

  const categories = ['All', ...new Set(tutorials.map(tutorial => tutorial.category))];
  const filteredTutorials = selectedCategory === 'All' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Code2, Play, Terminal, Palette, Brain, TestTube, Gamepad2
    };
    return icons[iconName] || GraduationCap;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Gaming': return Gamepad2;
      case 'Coding': return Code2;
      case 'Vibe Coding': return Palette;
      case 'AI': return Brain;
      case 'Game Testing': return TestTube;
      default: return GraduationCap;
    }
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interactive': return 'bg-purple-600';
      case 'video': return 'bg-blue-600';
      case 'coding': return 'bg-green-600';
      case 'game': return 'bg-orange-600';
      case 'ai-project': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const handlePurchaseTutorial = async (tutorial: Tutorial) => {
    if (!tutorial.price) return;

    try {
      await stripeService.createTutorialCheckout({
        id: tutorial.id,
        title: tutorial.title,
        price: tutorial.price,
        description: tutorial.description
      }, 'alex@example.com'); // This would come from user context
    } catch (error) {
      console.error('Failed to purchase tutorial:', error);
    }
  };

  if (selectedTutorial) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedTutorial(null)}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Tutorials
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tutorial Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg shadow-lg">
                    {React.createElement(getIcon(selectedTutorial.icon), { className: 'h-8 w-8 text-white' })}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{selectedTutorial.title}</h1>
                    <p className="text-gray-400 mt-1">{selectedTutorial.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(selectedTutorial.difficulty)}`}>
                    {selectedTutorial.difficulty}
                  </span>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${getTypeColor(selectedTutorial.type)}`}>
                      {selectedTutorial.type}
                    </span>
                  </div>
                  {selectedTutorial.isPremium && selectedTutorial.price && (
                    <div className="mt-2">
                      <span className="inline-block bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Premium ${selectedTutorial.price}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{selectedTutorial.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${selectedTutorial.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Interactive Content Area */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {selectedTutorial.modules[activeModule]?.title || 'Module Content'}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    Module {activeModule + 1} of {selectedTutorial.modules.length}
                  </span>
                </div>

                {selectedTutorial.hasCodeEditor && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Code Editor</span>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Run Code
                      </button>
                    </div>
                    <textarea
                      className="w-full bg-gray-900 text-green-400 font-mono text-sm p-3 rounded border border-gray-600 resize-none"
                      rows={8}
                      placeholder={selectedTutorial.modules[activeModule]?.codeTemplate || "// Write your code here..."}
                    />
                  </div>
                )}

                {selectedTutorial.hasGameSimulation && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Game Simulation</span>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Start Simulation
                      </button>
                    </div>
                    <div className="bg-gray-900 h-64 rounded border border-gray-600 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Gamepad2 className="h-12 w-12 mx-auto mb-2" />
                        <p>Interactive simulation will load here</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    {selectedTutorial.modules[activeModule]?.content || 'Module content goes here...'}
                  </p>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                    disabled={activeModule === 0}
                    className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveModule(Math.min(selectedTutorial.modules.length - 1, activeModule + 1))}
                    disabled={activeModule === selectedTutorial.modules.length - 1}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Section for Premium Tutorials */}
            {selectedTutorial.isPremium && selectedTutorial.price && (
              <div className="bg-gradient-to-r from-gold-600/20 to-yellow-600/20 backdrop-blur-xl border border-gold-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Premium Content</h3>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-gold-400">${selectedTutorial.price}</div>
                  <p className="text-gray-300 text-sm">Unlock full access to this premium tutorial</p>
                  <button 
                    onClick={() => handlePurchaseTutorial(selectedTutorial)}
                    className="w-full bg-gradient-to-r from-gold-600 to-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-gold-700 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Purchase Tutorial</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tutorial Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Tutorial Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-semibold">{selectedTutorial.estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">XP Reward</span>
                  <span className="text-yellow-400 font-semibold">+{selectedTutorial.xpReward}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Modules</span>
                  <span className="text-white font-semibold">{selectedTutorial.modules.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-green-400 font-semibold">
                    {selectedTutorial.modules.filter(m => m.completed).length}/{selectedTutorial.modules.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Module List */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Modules</h3>
              <div className="space-y-2">
                {selectedTutorial.modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeModule === index
                        ? 'bg-purple-600 text-white'
                        : module.completed
                        ? 'bg-green-900 text-green-100 hover:bg-green-800'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-xs">+{module.xpReward} XP</span>
                    </div>
                    <div className="text-xs opacity-75 mt-1 capitalize">{module.type}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Interactive Tutorials</h1>
          <p className="text-gray-400 mt-1">Master skills through hands-on learning experiences</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <GraduationCap className="h-5 w-5 text-purple-400" />
          <span>{filteredTutorials.length} tutorials available</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => {
          const Icon = getIcon(tutorial.icon);
          const completedModules = tutorial.modules.filter(m => m.completed).length;
          
          return (
            <div
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(tutorial.type)}`}>
                      {tutorial.type}
                    </span>
                  </div>
                  {tutorial.isPremium && tutorial.price && (
                    <div className="mt-1">
                      <span className="px-2 py-1 rounded-full text-xs text-white bg-gold-600">
                        ${tutorial.price}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tutorial.description}</p>

              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutorial.estimatedTime}
                </span>
                <span className="flex items-center text-yellow-400">
                  <Trophy className="h-4 w-4 mr-1" />
                  {tutorial.xpReward} XP
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{tutorial.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      tutorial.completed 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}
                    style={{ width: `${tutorial.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {completedModules}/{tutorial.modules.length} modules
                </div>
                <div className="flex space-x-2">
                  {tutorial.hasCodeEditor && (
                    <div className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs">
                      Code Editor
                    </div>
                  )}
                  {tutorial.hasGameSimulation && (
                    <div className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs">
                      Simulation
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-all group-hover:scale-105 ${
                  tutorial.completed 
                    ? 'bg-green-600 text-white shadow-lg'
                    : tutorial.progress > 0
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  {tutorial.completed ? 'Review Tutorial' : tutorial.progress > 0 ? 'Continue Learning' : 'Start Tutorial'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tutorials available</h3>
          <p className="text-gray-500">Check back later for new tutorials in this category!</p>
        </div>
      )}
    </div>
  );
};

export default Tutorials;