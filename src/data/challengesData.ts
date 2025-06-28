import { Challenge } from '../types';

export function generateChallenges(): Challenge[] {
  const categories = [
    'Frontend Development',
    'Backend Development',
    'Full-Stack Development',
    'Mobile Development',
    'Game Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Database Design',
    'API Development',
    'System Design',
    'Algorithms',
    'Data Structures',
    'Web Performance',
    'Security',
    'Cloud Architecture',
    'Microservices',
    'Blockchain'
  ];

  const challengeTemplates = {
    'Frontend Development': [
      'Build a Responsive Landing Page',
      'Create an Interactive Dashboard',
      'Develop a Real-time Chat Interface',
      'Build a Progressive Web App',
      'Create an E-commerce Product Page',
      'Develop a Task Management App',
      'Build a Weather Application',
      'Create a Music Player Interface',
      'Develop a Social Media Feed',
      'Build a Portfolio Website'
    ],
    'Backend Development': [
      'Design a RESTful API',
      'Build a User Authentication System',
      'Create a Real-time Messaging Service',
      'Develop a File Upload Service',
      'Build a Caching Layer',
      'Create a Data Processing Pipeline',
      'Develop a Notification System',
      'Build a Payment Gateway Integration',
      'Create a Search Service',
      'Develop a Monitoring System'
    ],
    'Full-Stack Development': [
      'Build a Complete E-commerce Platform',
      'Create a Social Networking App',
      'Develop a Project Management Tool',
      'Build a Learning Management System',
      'Create a Booking Platform',
      'Develop a Content Management System',
      'Build a Real-time Collaboration Tool',
      'Create a Marketplace Application',
      'Develop a Financial Dashboard',
      'Build a Inventory Management System'
    ],
    'Mobile Development': [
      'Create a Cross-platform Mobile App',
      'Build a Native iOS Application',
      'Develop an Android App with Kotlin',
      'Create a React Native App',
      'Build a Flutter Application',
      'Develop a Mobile Game',
      'Create an AR Mobile Experience',
      'Build a Location-based App',
      'Develop a Mobile Wallet',
      'Create a Fitness Tracking App'
    ],
    'Game Development': [
      'Create a 2D Platformer Game',
      'Build a 3D Racing Game',
      'Develop a Puzzle Game',
      'Create a Multiplayer Battle Game',
      'Build a Virtual Reality Experience',
      'Develop a Mobile Casual Game',
      'Create a Strategy Game',
      'Build a Role-playing Game',
      'Develop an Educational Game',
      'Create a Simulation Game'
    ],
    'Data Science': [
      'Analyze Customer Behavior Data',
      'Build a Recommendation System',
      'Create a Predictive Model',
      'Develop a Data Visualization Dashboard',
      'Build a Sentiment Analysis Tool',
      'Create a Time Series Forecasting Model',
      'Develop a Fraud Detection System',
      'Build a Customer Segmentation Model',
      'Create a Sales Forecasting System',
      'Develop a Market Basket Analysis'
    ],
    'Machine Learning': [
      'Build an Image Classification Model',
      'Create a Natural Language Processing System',
      'Develop a Reinforcement Learning Agent',
      'Build a Computer Vision Application',
      'Create a Speech Recognition System',
      'Develop a Deep Learning Model',
      'Build a Chatbot with NLP',
      'Create an Anomaly Detection System',
      'Develop a Neural Network from Scratch',
      'Build a Generative AI Model'
    ],
    'DevOps': [
      'Set up a CI/CD Pipeline',
      'Deploy with Docker and Kubernetes',
      'Create Infrastructure as Code',
      'Build a Monitoring Solution',
      'Implement Blue-Green Deployment',
      'Set up Log Aggregation',
      'Create Auto-scaling Infrastructure',
      'Build a Backup and Recovery System',
      'Implement Security Scanning',
      'Create a Multi-environment Setup'
    ],
    'Cybersecurity': [
      'Conduct a Penetration Test',
      'Build a Security Monitoring System',
      'Create a Vulnerability Scanner',
      'Develop a Malware Analysis Tool',
      'Build an Intrusion Detection System',
      'Create a Security Awareness Training',
      'Develop a Threat Intelligence Platform',
      'Build a Secure Communication App',
      'Create a Digital Forensics Tool',
      'Develop a Security Compliance Checker'
    ],
    'UI/UX Design': [
      'Design a Mobile App Interface',
      'Create a Design System',
      'Build an Accessible Web Interface',
      'Design a Dashboard for Analytics',
      'Create a User Onboarding Flow',
      'Design an E-commerce Checkout Process',
      'Build a Responsive Email Template',
      'Create a Voice User Interface',
      'Design a AR/VR Experience',
      'Build a Dark Mode Interface'
    ]
  };

  const challenges: Challenge[] = [];
  let challengeId = 1;

  categories.forEach(category => {
    const templates = challengeTemplates[category] || challengeTemplates['Frontend Development'];
    
    // Create multiple difficulty variations for each template
    templates.forEach(template => {
      const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
      
      difficulties.forEach((difficulty, diffIndex) => {
        const baseTimeLimit = ['1 hour', '2 hours', '4 hours', '8 hours'][diffIndex];
        const baseXP = [100, 200, 400, 800][diffIndex];
        const participants = Math.floor(Math.random() * 500) + 50;
        
        // Create deadline 7-30 days from now
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 23) + 7);
        
        const status = Math.random() > 0.3 ? 'active' : Math.random() > 0.5 ? 'upcoming' : 'completed';

        challenges.push({
          id: challengeId.toString(),
          title: `${template} - ${difficulty} Level`,
          description: `${difficulty} level challenge for ${category.toLowerCase()}. ${template.toLowerCase()} with specific requirements and constraints. Test your skills and compete with developers worldwide.`,
          difficulty: difficulty as any,
          timeLimit: baseTimeLimit,
          xpReward: baseXP + Math.floor(Math.random() * 100),
          participants,
          deadline: deadline.toISOString(),
          category,
          status: status as any,
          certificateEligible: difficulty === 'Expert' || Math.random() > 0.7
        });

        challengeId++;
      });
    });
  });

  // Add some special themed challenges
  const specialChallenges = [
    {
      title: 'Holiday Hackathon - Christmas Theme',
      description: 'Create a festive web application with Christmas theme, animations, and interactive elements.',
      difficulty: 'Medium',
      timeLimit: '48 hours',
      xpReward: 500,
      category: 'Frontend Development'
    },
    {
      title: '24-Hour Game Jam',
      description: 'Build a complete game from scratch in just 24 hours with a surprise theme.',
      difficulty: 'Hard',
      timeLimit: '24 hours',
      xpReward: 750,
      category: 'Game Development'
    },
    {
      title: 'Speed Coding Championship',
      description: 'Solve algorithmic problems as quickly as possible in this speed coding challenge.',
      difficulty: 'Expert',
      timeLimit: '90 minutes',
      xpReward: 1000,
      category: 'Algorithms'
    },
    {
      title: 'AI Ethics Challenge',
      description: 'Design an AI system that addresses ethical concerns and bias in machine learning.',
      difficulty: 'Expert',
      timeLimit: '1 week',
      xpReward: 1200,
      category: 'Machine Learning'
    },
    {
      title: 'Green Code Challenge',
      description: 'Optimize existing code for minimal environmental impact and energy efficiency.',
      difficulty: 'Hard',
      timeLimit: '3 days',
      xpReward: 600,
      category: 'Backend Development'
    }
  ];

  specialChallenges.forEach(challenge => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 30) + 1);
    
    challenges.push({
      id: challengeId.toString(),
      title: challenge.title,
      description: challenge.description,
      difficulty: challenge.difficulty as any,
      timeLimit: challenge.timeLimit,
      xpReward: challenge.xpReward,
      participants: Math.floor(Math.random() * 1000) + 100,
      deadline: deadline.toISOString(),
      category: challenge.category,
      status: 'active',
      certificateEligible: true
    });

    challengeId++;
  });

  return challenges;
}

export const comprehensiveChallenges = generateChallenges();

// Challenge collections
export const activeChallenges = comprehensiveChallenges.filter(c => c.status === 'active');
export const upcomingChallenges = comprehensiveChallenges.filter(c => c.status === 'upcoming');
export const completedChallenges = comprehensiveChallenges.filter(c => c.status === 'completed');

export const easyChallenges = comprehensiveChallenges.filter(c => c.difficulty === 'Easy');
export const mediumChallenges = comprehensiveChallenges.filter(c => c.difficulty === 'Medium');
export const hardChallenges = comprehensiveChallenges.filter(c => c.difficulty === 'Hard');
export const expertChallenges = comprehensiveChallenges.filter(c => c.difficulty === 'Expert');

export const certificateEligibleChallenges = comprehensiveChallenges.filter(c => c.certificateEligible);
export const frontendChallenges = comprehensiveChallenges.filter(c => c.category === 'Frontend Development');
export const backendChallenges = comprehensiveChallenges.filter(c => c.category === 'Backend Development');
export const gameDevChallenges = comprehensiveChallenges.filter(c => c.category === 'Game Development');
export const dataScienceChallenges = comprehensiveChallenges.filter(c => c.category === 'Data Science');