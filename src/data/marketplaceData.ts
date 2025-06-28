export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  previewImages: string[];
  downloadUrl?: string;
  tags: string[];
  purchases: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  featured: boolean;
  type: 'digital' | 'course' | 'tool' | 'asset' | 'template';
  fileSize?: string;
  format?: string;
  compatibility?: string[];
  requirements?: string[];
  license: 'commercial' | 'personal' | 'educational' | 'royalty-free';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

// Generate 100,000+ products programmatically
export function generateMarketplaceProducts(): MarketplaceProduct[] {
  const categories = [
    'Game Development Tools',
    'Educational Resources',
    'Digital Assets',
    'Software Development',
    'Design Tools',
    'Audio & Music',
    'Video Production',
    'AI & Machine Learning',
    'Web Development',
    'Mobile Development',
    'Game Assets',
    'Templates & Themes',
    'Plugins & Extensions',
    'Stock Media',
    'Learning Materials'
  ];

  const subcategories = {
    'Game Development Tools': ['Unity Extensions', 'Unreal Plugins', 'Game Engines', 'Level Editors', 'Asset Importers', 'Performance Tools'],
    'Educational Resources': ['Video Courses', 'eBooks', 'Interactive Tutorials', 'Certification Programs', 'Workshop Materials', 'Study Guides'],
    'Digital Assets': ['3D Models', 'Textures', 'Sprites', 'Icons', 'UI Elements', 'Animations'],
    'Software Development': ['IDEs', 'Debugging Tools', 'Testing Frameworks', 'Code Libraries', 'APIs', 'Development Utilities'],
    'Design Tools': ['Photoshop Plugins', 'Figma Templates', 'Color Palettes', 'Font Collections', 'Design Systems', 'Mockup Templates'],
    'Audio & Music': ['Sound Effects', 'Music Tracks', 'Audio Tools', 'Voice Packs', 'Ambient Sounds', 'Sound Libraries'],
    'Video Production': ['Video Templates', 'Motion Graphics', 'Transitions', 'Title Sequences', 'VFX Assets', 'Color Presets'],
    'AI & Machine Learning': ['Pre-trained Models', 'Datasets', 'ML Libraries', 'AI Tools', 'Neural Networks', 'Algorithm Templates'],
    'Web Development': ['React Components', 'Vue Libraries', 'CSS Frameworks', 'JavaScript Tools', 'Web Templates', 'API Collections'],
    'Mobile Development': ['React Native Components', 'Flutter Packages', 'iOS Libraries', 'Android Tools', 'App Templates', 'Mobile UI Kits'],
    'Game Assets': ['Character Models', 'Environment Assets', 'Weapon Collections', 'Vehicle Packs', 'Particle Effects', 'Shader Collections'],
    'Templates & Themes': ['Website Templates', 'App Designs', 'Dashboard Themes', 'Landing Pages', 'Portfolio Templates', 'Admin Panels'],
    'Plugins & Extensions': ['VS Code Extensions', 'Browser Plugins', 'Editor Tools', 'Workflow Automation', 'Integration Tools', 'Utility Plugins'],
    'Stock Media': ['Stock Photos', 'Vector Graphics', 'Illustrations', 'Photography', 'Digital Art', 'Background Images'],
    'Learning Materials': ['Coding Bootcamps', 'Skill Assessments', 'Practice Projects', 'Code Examples', 'Best Practices', 'Industry Guides']
  };

  const productTemplates = [
    'Professional {{category}} for {{use_case}}',
    'Complete {{category}} Collection',
    'Advanced {{category}} Toolkit',
    'Premium {{category}} Bundle',
    'Essential {{category}} Pack',
    'Ultimate {{category}} Suite',
    'Modern {{category}} Framework',
    'Comprehensive {{category}} Guide',
    'High-Quality {{category}} Assets',
    'Industry-Standard {{category}} Tools'
  ];

  const sellers = [
    { name: 'TechCraft Studios', rating: 4.9, verified: true, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'CodeMaster Pro', rating: 4.8, verified: true, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'DigitalCraft', rating: 4.7, verified: true, avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'AssetForge', rating: 4.9, verified: true, avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'DevTools Inc', rating: 4.6, verified: true, avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'CreativeSpace', rating: 4.8, verified: true, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'InnovateStudio', rating: 4.7, verified: false, avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'ProAssets', rating: 4.9, verified: true, avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const products: MarketplaceProduct[] = [];
  
  for (let i = 0; i < 100000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subcategory = subcategories[category][Math.floor(Math.random() * subcategories[category].length)];
    const seller = sellers[Math.floor(Math.random() * sellers.length)];
    const template = productTemplates[Math.floor(Math.random() * productTemplates.length)];
    
    const basePrice = Math.floor(Math.random() * 500) + 10;
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0;
    const price = discount > 0 ? Math.floor(basePrice * (1 - discount / 100)) : basePrice;
    
    const title = template
      .replace('{{category}}', subcategory)
      .replace('{{use_case}}', ['Game Development', 'Web Design', 'Mobile Apps', 'Enterprise Solutions', 'Creative Projects'][Math.floor(Math.random() * 5)]);

    products.push({
      id: `prod_${i + 1}`,
      title: `${title} v${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}`,
      description: `High-quality ${subcategory.toLowerCase()} designed for professional ${category.toLowerCase()}. This comprehensive package includes everything you need to enhance your projects with industry-standard quality and performance.`,
      category,
      subcategory,
      price,
      originalPrice: discount > 0 ? basePrice : undefined,
      seller: {
        id: `seller_${seller.name.replace(/\s+/g, '_').toLowerCase()}`,
        name: seller.name,
        avatar: seller.avatar,
        rating: seller.rating,
        verified: seller.verified
      },
      previewImages: [
        'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: [
        subcategory.toLowerCase().replace(/\s+/g, '-'),
        category.toLowerCase().replace(/\s+/g, '-'),
        'professional',
        'high-quality',
        ['unity', 'unreal', 'godot', 'javascript', 'react', 'vue', 'angular', 'python', 'java', 'c#'][Math.floor(Math.random() * 10)]
      ],
      purchases: Math.floor(Math.random() * 10000),
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviews: Math.floor(Math.random() * 500),
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      featured: Math.random() > 0.95,
      type: ['digital', 'course', 'tool', 'asset', 'template'][Math.floor(Math.random() * 5)] as any,
      fileSize: `${Math.floor(Math.random() * 1000) + 10} MB`,
      format: ['ZIP', 'Unity Package', 'Source Code', 'PDF + Assets', 'Video + Files'][Math.floor(Math.random() * 5)],
      compatibility: ['Windows', 'macOS', 'Linux', 'Unity 2022+', 'Unreal Engine 5', 'Web Browsers'].slice(0, Math.floor(Math.random() * 3) + 1),
      requirements: ['Modern Graphics Card', '16GB RAM Recommended', 'Unity 2022.3 or later', 'Basic Programming Knowledge'].slice(0, Math.floor(Math.random() * 2) + 1),
      license: ['commercial', 'personal', 'educational', 'royalty-free'][Math.floor(Math.random() * 4)] as any,
      difficulty: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)] as any
    });
  }

  return products;
}

export const marketplaceProducts = generateMarketplaceProducts();

// Featured products for quick access
export const featuredProducts = marketplaceProducts.filter(product => product.featured).slice(0, 20);

// Category-specific collections
export const productsByCategory = categories.reduce((acc, category) => {
  acc[category] = marketplaceProducts.filter(product => product.category === category).slice(0, 1000);
  return acc;
}, {} as Record<string, MarketplaceProduct[]>);

export const topRatedProducts = marketplaceProducts
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 100);

export const bestSellers = marketplaceProducts
  .sort((a, b) => b.purchases - a.purchases)
  .slice(0, 100);

export const newReleases = marketplaceProducts
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 100);