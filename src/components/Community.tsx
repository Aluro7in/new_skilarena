import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Plus, Search, TrendingUp, Award, Camera, Video, Link, Hash } from 'lucide-react';

interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  mediaUrls: string[];
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  createdAt: Date;
  isLiked: boolean;
}

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  upvotes: number;
  createdAt: Date;
}

const Community: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'trending' | 'create'>('feed');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      authorId: '1',
      authorName: 'Alex Chen',
      authorAvatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Just completed my first Unity project! A simple 2D platformer with custom physics. The jump mechanics took forever to get right, but so worth it! 🎮✨',
      mediaUrls: ['https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'],
      tags: ['unity', 'gamedev', 'platformer', 'firstproject'],
      upvotes: 42,
      downvotes: 2,
      comments: [
        {
          id: '1',
          authorId: '2',
          authorName: 'Sarah Johnson',
          authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          content: 'Looks amazing! The art style is really clean. Did you create the sprites yourself?',
          upvotes: 8,
          createdAt: new Date('2024-02-26T10:30:00Z')
        }
      ],
      createdAt: new Date('2024-02-26T09:00:00Z'),
      isLiked: true
    },
    {
      id: '2',
      authorId: '3',
      authorName: 'Marcus Rodriguez',
      authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Found a critical bug in the beta test for Cyber Nexus! The inventory system was duplicating items when players used quick-save during item pickup. Submitted detailed reproduction steps to the dev team. 🐛',
      mediaUrls: [],
      tags: ['gametesting', 'bugfinding', 'cybernexus', 'qa'],
      upvotes: 67,
      downvotes: 1,
      comments: [
        {
          id: '2',
          authorId: '4',
          authorName: 'Emily Davis',
          authorAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
          content: 'Great catch! Item duplication bugs can really break game economy. Nice work!',
          upvotes: 12,
          createdAt: new Date('2024-02-26T11:00:00Z')
        }
      ],
      createdAt: new Date('2024-02-26T08:15:00Z'),
      isLiked: false
    },
    {
      id: '3',
      authorId: '4',
      authorName: 'Emily Davis',
      authorAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'Created a procedural planet generator using Perlin noise! Still working on the atmospheric rendering but the terrain generation is looking solid. Here\'s a timelapse of the process:',
      mediaUrls: [
        'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['procedural', 'gamedev', 'planets', 'noise', 'shader'],
      upvotes: 89,
      downvotes: 3,
      comments: [],
      createdAt: new Date('2024-02-26T07:30:00Z'),
      isLiked: true
    }
  ];

  const trendingTopics = [
    { tag: 'unity', posts: 234, growth: '+15%' },
    { tag: 'gamedev', posts: 189, growth: '+8%' },
    { tag: 'gametesting', posts: 156, growth: '+22%' },
    { tag: 'procedural', posts: 98, growth: '+35%' },
    { tag: 'shader', posts: 87, growth: '+12%' }
  ];

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      authorId: '1',
      authorName: 'Alex Chen',
      authorAvatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: newPostContent,
      mediaUrls: [],
      tags: newPostTags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag),
      upvotes: 0,
      downvotes: 0,
      comments: [],
      createdAt: new Date(),
      isLiked: false
    };

    // Add to posts (in real app, this would be an API call)
    setNewPostContent('');
    setNewPostTags('');
    setSelectedTab('feed');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-gray-400 mt-1">Connect, share, and learn with fellow developers</p>
        </div>
        <button
          onClick={() => setSelectedTab('create')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Members</p>
              <p className="text-2xl font-bold">12.4K</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Posts Today</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Likes Given</p>
              <p className="text-2xl font-bold">2.3K</p>
            </div>
            <Heart className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Projects Shared</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <Award className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'feed', label: 'Feed', icon: MessageCircle },
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'create', label: 'Create Post', icon: Plus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {selectedTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts, topics, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Posts */}
            {communityPosts.map((post) => (
              <div key={post.id} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">{post.authorName}</span>
                      <span className="text-gray-400 text-sm">{formatTimeAgo(post.createdAt)}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    
                    {post.mediaUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.mediaUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Post media ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <button className={`flex items-center space-x-1 transition-colors ${
                        post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                      }`}>
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.upvotes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>
                    
                    {post.comments.length > 0 && (
                      <div className="mt-4 space-y-3 border-t border-gray-700 pt-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-white text-sm">{comment.authorName}</span>
                                <span className="text-gray-400 text-xs">{formatTimeAgo(comment.createdAt)}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1">
                        <Hash className="h-4 w-4 text-purple-400" />
                        <span className="font-medium text-white">#{topic.tag}</span>
                      </div>
                      <div className="text-gray-400 text-sm">{topic.posts} posts</div>
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{topic.growth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Be respectful and constructive in discussions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share your projects and get feedback</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Help others learn and grow</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No spam or self-promotion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'trending' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Hash className="h-6 w-6 text-purple-400" />
                  <span className="text-xl font-bold text-white">#{topic.tag}</span>
                </div>
                <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-sm font-semibold">
                  {topic.growth}
                </span>
              </div>
              <div className="text-gray-400 mb-4">{topic.posts} posts this week</div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                Explore Topic
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'create' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create a New Post</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  What's on your mind?
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your latest project, ask for help, or start a discussion..."
                  rows={6}
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="gamedev, unity, coding, tutorial"
                  className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="flex items-center space-x-4 text-gray-400">
                <button className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Camera className="h-5 w-5" />
                  <span>Add Photo</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Video className="h-5 w-5" />
                  <span>Add Video</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Link className="h-5 w-5" />
                  <span>Add Link</span>
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedTab('feed')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Share Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;