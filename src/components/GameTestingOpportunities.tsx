import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, Trophy, Gamepad2, Smartphone, Monitor, Calendar, Zap, Target, Award, ChevronRight } from 'lucide-react';

interface GameTestingOpportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  gameGenre: string;
  platform: string[];
  duration: string;
  compensation: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced' | 'Expert';
  requirements: string[];
  description: string;
  applicants: number;
  maxApplicants: number;
  deadline: string;
  featured: boolean;
  rating: number;
  tags: string[];
}

const GameTestingOpportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<GameTestingOpportunity | null>(null);

  const opportunities: GameTestingOpportunity[] = [
    {
      id: '1',
      title: 'Senior QA Tester - AAA RPG',
      company: 'Epic Games',
      logo: '🎮',
      location: 'Seattle, WA',
      type: 'Hybrid',
      gameGenre: 'RPG',
      platform: ['PC', 'PlayStation', 'Xbox'],
      duration: '6 months',
      compensation: '$4,500/month',
      difficulty: 'Advanced',
      requirements: ['3+ years QA experience', 'RPG game knowledge', 'Bug tracking tools'],
      description: 'Join our team testing the next generation RPG with cutting-edge graphics and immersive gameplay.',
      applicants: 89,
      maxApplicants: 150,
      deadline: '2024-12-30',
      featured: true,
      rating: 4.9,
      tags: ['High Pay', 'AAA Studio', 'Career Growth']
    },
    {
      id: '2',
      title: 'Mobile Game Beta Tester',
      company: 'Supercell',
      logo: '📱',
      location: 'Helsinki, Finland',
      type: 'Remote',
      gameGenre: 'Strategy',
      platform: ['iOS', 'Android'],
      duration: '3 months',
      compensation: '$2,800/month',
      difficulty: 'Intermediate',
      requirements: ['Mobile gaming experience', 'Attention to detail', 'Communication skills'],
      description: 'Help us perfect our upcoming strategy game before global launch.',
      applicants: 234,
      maxApplicants: 300,
      deadline: '2024-12-25',
      featured: true,
      rating: 4.7,
      tags: ['Remote Work', 'Mobile Focus', 'Global Launch']
    },
    {
      id: '3',
      title: 'VR Game Experience Tester',
      company: 'Meta Reality Labs',
      logo: '🥽',
      location: 'Menlo Park, CA',
      type: 'On-site',
      gameGenre: 'VR Experience',
      platform: ['Meta Quest', 'PICO'],
      duration: '4 months',
      compensation: '$5,200/month',
      difficulty: 'Expert',
      requirements: ['VR experience', 'Motion sickness tolerance', 'Technical documentation'],
      description: 'Pioneer the future of VR gaming with our revolutionary new platform.',
      applicants: 67,
      maxApplicants: 100,
      deadline: '2024-12-28',
      featured: true,
      rating: 4.8,
      tags: ['Cutting Edge', 'VR Focus', 'High Compensation']
    },
    {
      id: '4',
      title: 'Indie Game Playtester',
      company: 'Indie Collective',
      logo: '🎨',
      location: 'Global',
      type: 'Remote',
      gameGenre: 'Various',
      platform: ['PC', 'Steam'],
      duration: '2 months',
      compensation: '$1,500/month',
      difficulty: 'Entry',
      requirements: ['Gaming passion', 'Feedback skills', 'Flexible schedule'],
      description: 'Discover and help shape amazing indie games before they hit the market.',
      applicants: 445,
      maxApplicants: 500,
      deadline: '2024-12-22',
      featured: false,
      rating: 4.5,
      tags: ['Beginner Friendly', 'Indie Games', 'Flexible']
    },
    {
      id: '5',
      title: 'Esports Game Balance Tester',
      company: 'Riot Games',
      logo: '⚔️',
      location: 'Los Angeles, CA',
      type: 'Hybrid',
      gameGenre: 'MOBA',
      platform: ['PC'],
      duration: '8 months',
      compensation: '$4,000/month',
      difficulty: 'Advanced',
      requirements: ['Competitive gaming', 'Game balance understanding', 'Data analysis'],
      description: 'Help maintain competitive integrity in our flagship esports title.',
      applicants: 156,
      maxApplicants: 200,
      deadline: '2024-12-26',
      featured: true,
      rating: 4.9,
      tags: ['Esports', 'Competitive', 'Long term']
    },
    {
      id: '6',
      title: 'AR Mobile Game Tester',
      company: 'Niantic',
      logo: '🌍',
      location: 'San Francisco, CA',
      type: 'Remote',
      gameGenre: 'AR Adventure',
      platform: ['iOS', 'Android'],
      duration: '5 months',
      compensation: '$3,200/month',
      difficulty: 'Intermediate',
      requirements: ['AR game experience', 'Location-based testing', 'Community engagement'],
      description: 'Test the next evolution of location-based AR gaming.',
      applicants: 203,
      maxApplicants: 250,
      deadline: '2024-12-29',
      featured: false,
      rating: 4.6,
      tags: ['AR Technology', 'Location Based', 'Innovation']
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.gameGenre.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'featured') return matchesSearch && opp.featured;
    if (selectedFilter === 'remote') return matchesSearch && opp.type === 'Remote';
    if (selectedFilter === 'entry') return matchesSearch && opp.difficulty === 'Entry';
    return matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Entry': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-orange-600';
      case 'Expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Remote': return '🌐';
      case 'On-site': return '🏢';
      case 'Hybrid': return '🔄';
      default: return '📍';
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('Mobile')) return <Smartphone className="h-4 w-4" />;
    if (platform.includes('PC')) return <Monitor className="h-4 w-4" />;
    return <Gamepad2 className="h-4 w-4" />;
  };

  if (selectedOpportunity) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedOpportunity(null)}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Opportunities
        </button>

        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10">
                {selectedOpportunity.logo}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedOpportunity.title}</h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="text-xl font-semibold text-purple-400">{selectedOpportunity.company}</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedOpportunity.location}</span>
                  </div>
                  <span>{getTypeIcon(selectedOpportunity.type)} {selectedOpportunity.type}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400 mb-2">{selectedOpportunity.compensation}</div>
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(selectedOpportunity.difficulty)}`}>
                {selectedOpportunity.difficulty} Level
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedOpportunity.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {selectedOpportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-300">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.platform.map((platform, index) => (
                    <span key={index} className="flex items-center space-x-1 bg-gray-700/50 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full border border-white/10">
                      {getPlatformIcon(platform)}
                      <span>{platform}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Opportunity Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{selectedOpportunity.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genre</span>
                    <span className="text-white font-semibold">{selectedOpportunity.gameGenre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Applicants</span>
                    <span className="text-white font-semibold">{selectedOpportunity.applicants}/{selectedOpportunity.maxApplicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{selectedOpportunity.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.tags.map((tag, index) => (
                    <span key={index} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Game Testing Opportunities
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover exclusive game testing opportunities from top studios worldwide. Shape the future of gaming while earning competitive compensation.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search opportunities, companies, or genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'featured', label: 'Featured' },
              { id: 'remote', label: 'Remote' },
              { id: 'entry', label: 'Entry Level' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-black/30 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            onClick={() => setSelectedOpportunity(opportunity)}
            className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 ${
              opportunity.featured ? 'ring-2 ring-purple-500/50' : ''
            }`}
          >
            {opportunity.featured && (
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 text-sm font-semibold">Featured Opportunity</span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10">
                  {opportunity.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{opportunity.title}</h3>
                  <p className="text-purple-400 font-semibold">{opportunity.company}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getDifficultyColor(opportunity.difficulty)}`}>
                {opportunity.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Location</span>
                </div>
                <p className="text-white font-semibold">{opportunity.location}</p>
                <p className="text-gray-400 text-sm">{getTypeIcon(opportunity.type)} {opportunity.type}</p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Compensation</span>
                </div>
                <p className="text-green-400 font-bold">{opportunity.compensation}</p>
                <p className="text-gray-400 text-sm">{opportunity.duration}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{opportunity.applicants}/{opportunity.maxApplicants}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{opportunity.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-300 px-2 py-1 rounded-full text-xs backdrop-blur-sm border border-purple-500/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">{opportunity.gameGenre}</span>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-105">
                View Details
              </button>
            </div>

            {/* Progress bar for applications */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Applications</span>
                <span>{Math.round((opportunity.applicants / opportunity.maxApplicants) * 100)}% filled</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(opportunity.applicants / opportunity.maxApplicants) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No opportunities found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
        <Zap className="h-12 w-12 mx-auto mb-4 text-purple-400" />
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Game Testing Career?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of testers who are shaping the future of gaming while earning competitive compensation from top studios worldwide.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
            Create Tester Profile
          </button>
          <button className="bg-black/30 backdrop-blur-sm border border-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-black/50 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTestingOpportunities;