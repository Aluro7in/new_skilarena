import React, { useState } from 'react';
import { ShoppingCart, Star, Download, Tag, Filter, Search, Upload, DollarSign, Eye, Heart, MessageCircle } from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: 'models' | 'sounds' | 'tutorials' | 'templates' | 'assets';
  price: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  previewImages: string[];
  downloadUrl?: string;
  tags: string[];
  purchases: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  featured: boolean;
}

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'models', name: '3D Models', icon: '🎯' },
    { id: 'sounds', name: 'Sound Packs', icon: '🎵' },
    { id: 'tutorials', name: 'Tutorials', icon: '📚' },
    { id: 'templates', name: 'Templates', icon: '📋' },
    { id: 'assets', name: 'Game Assets', icon: '🎮' }
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      title: 'Cyberpunk Character Pack',
      description: 'High-quality 3D character models with animations for cyberpunk games.',
      category: 'models',
      price: 29.99,
      seller: {
        id: '1',
        name: 'NeonArt Studio',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9
      },
      previewImages: [
        'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['cyberpunk', '3d-models', 'characters', 'animations'],
      purchases: 234,
      rating: 4.8,
      reviews: 47,
      createdAt: new Date('2024-01-15'),
      featured: true
    },
    {
      id: '2',
      title: 'Epic Orchestral Music Pack',
      description: 'Cinematic orchestral tracks perfect for RPG and adventure games.',
      category: 'sounds',
      price: 19.99,
      seller: {
        id: '2',
        name: 'AudioMaster',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.7
      },
      previewImages: [
        'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['music', 'orchestral', 'rpg', 'cinematic'],
      purchases: 189,
      rating: 4.9,
      reviews: 32,
      createdAt: new Date('2024-02-01'),
      featured: false
    },
    {
      id: '3',
      title: 'Unity Game Template: Platformer',
      description: 'Complete 2D platformer template with physics, enemies, and power-ups.',
      category: 'templates',
      price: 39.99,
      seller: {
        id: '3',
        name: 'GameDev Pro',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.8
      },
      previewImages: [
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['unity', 'template', 'platformer', '2d-game'],
      purchases: 156,
      rating: 4.7,
      reviews: 28,
      createdAt: new Date('2024-01-20'),
      featured: true
    },
    {
      id: '4',
      title: 'Advanced Shader Tutorial Series',
      description: 'Master shader programming with this comprehensive video series.',
      category: 'tutorials',
      price: 49.99,
      seller: {
        id: '4',
        name: 'ShaderGuru',
        avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9
      },
      previewImages: [
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['shaders', 'tutorial', 'advanced', 'graphics'],
      purchases: 298,
      rating: 4.9,
      reviews: 67,
      createdAt: new Date('2024-01-10'),
      featured: true
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.purchases - a.purchases;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      default:
        return 0;
    }
  });

  if (selectedItem) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedItem(null)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Item Images */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={selectedItem.previewImages[0]}
                alt={selectedItem.title}
                className="w-full h-80 object-cover"
              />
            </div>
            {selectedItem.previewImages.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {selectedItem.previewImages.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 2}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h1>
              <p className="text-gray-300 text-lg">{selectedItem.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{selectedItem.rating}</span>
                <span className="text-gray-400">({selectedItem.reviews} reviews)</span>
              </div>
              <div className="text-gray-400">
                {selectedItem.purchases} purchases
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-green-400">${selectedItem.price}</span>
                <div className="flex space-x-2">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Purchase Now
              </button>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Seller Information</h3>
              <div className="flex items-center space-x-3">
                <img
                  src={selectedItem.seller.avatar}
                  alt={selectedItem.seller.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-white">{selectedItem.seller.name}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{selectedItem.seller.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
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
          <h1 className="text-3xl font-bold text-white">Digital Marketplace</h1>
          <p className="text-gray-400 mt-1">Buy and sell game development assets</p>
        </div>
        <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Sell Item</span>
        </button>
      </div>

      {/* Featured Items Banner */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketplaceItems.filter(item => item.featured).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-black/50 transition-all transform hover:scale-105"
            >
              <img
                src={item.previewImages[0]}
                alt={item.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">${item.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-gray-300 text-xs">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search assets, tutorials, models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-black/30 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-black/30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="relative mb-4">
              <img
                src={item.previewImages[0]}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              {item.featured && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Featured
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">${item.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{item.rating}</span>
                  <span className="text-gray-400 text-sm">({item.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-300 text-sm">{item.seller.name}</span>
                </div>
                <div className="text-gray-400 text-sm">
                  {item.purchases} sales
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;