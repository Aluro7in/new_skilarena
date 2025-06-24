import { User, Skill, Challenge, Badge, LeaderboardEntry, Tutorial, GameTest } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Chen',
  avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  level: 12,
  xp: 2840,
  totalXp: 12750,
  streak: 7,
  badges: [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first skill',
      icon: 'Trophy',
      rarity: 'Common',
      earnedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Code Warrior',
      description: 'Completed 10 coding challenges',
      icon: 'Zap',
      rarity: 'Rare',
      earnedAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Streak Master',
      description: 'Maintained a 7-day learning streak',
      icon: 'Flame',
      rarity: 'Epic',
      earnedAt: '2024-02-10'
    },
    {
      id: '4',
      name: 'Bug Hunter',
      description: 'Found 25 critical bugs in game testing',
      icon: 'Target',
      rarity: 'Epic',
      earnedAt: '2024-02-15'
    }
  ],
  completedSkills: ['1', '2', '5'],
  currentChallenges: [],
  tutorialsCompleted: ['1', '3'],
  gameTestingStats: {
    totalBugReports: 47,
    totalGamesInvolved: 8,
    validBugs: 42,
    feedbackScore: 4.8,
    specializations: ['UI/UX Testing', 'Performance Testing', 'Gameplay Balance']
  }
};

export const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Game Development Fundamentals',
    description: 'Learn the core concepts of game development including game loops, physics, and player mechanics.',
    category: 'Gaming',
    difficulty: 'Beginner',
    type: 'interactive',
    estimatedTime: '6 hours',
    xpReward: 400,
    hasCodeEditor: true,
    hasGameSimulation: true,
    modules: [
      {
        id: '1',
        title: 'Game Loop Basics',
        type: 'theory',
        content: 'Understanding the fundamental game loop: Update, Render, Input',
        completed: true,
        xpReward: 50
      },
      {
        id: '2',
        title: 'Create Your First Game',
        type: 'practice',
        content: 'Build a simple Pong game using JavaScript',
        codeTemplate: 'const canvas = document.getElementById("gameCanvas");\n// Your code here',
        completed: true,
        xpReward: 100
      },
      {
        id: '3',
        title: 'Physics Integration',
        type: 'challenge',
        content: 'Add realistic physics to your game objects',
        completed: false,
        xpReward: 150
      }
    ],
    completed: true,
    progress: 100,
    icon: 'Gamepad2'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JavaScript concepts including closures, prototypes, and async programming.',
    category: 'Coding',
    difficulty: 'Advanced',
    type: 'coding',
    estimatedTime: '8 hours',
    xpReward: 500,
    hasCodeEditor: true,
    hasGameSimulation: false,
    modules: [
      {
        id: '1',
        title: 'Closures Deep Dive',
        type: 'theory',
        content: 'Understanding closures and their practical applications',
        completed: false,
        xpReward: 80
      },
      {
        id: '2',
        title: 'Async/Await Mastery',
        type: 'practice',
        content: 'Handle asynchronous operations like a pro',
        codeTemplate: 'async function fetchData() {\n  // Your implementation\n}',
        completed: false,
        xpReward: 120
      }
    ],
    completed: false,
    progress: 0,
    icon: 'Code2'
  },
  {
    id: '3',
    title: 'Creative Coding & Visual Art',
    description: 'Explore the artistic side of programming with generative art, interactive visuals, and creative algorithms.',
    category: 'Vibe Coding',
    difficulty: 'Intermediate',
    type: 'interactive',
    estimatedTime: '5 hours',
    xpReward: 350,
    hasCodeEditor: true,
    hasGameSimulation: false,
    modules: [
      {
        id: '1',
        title: 'Generative Art with P5.js',
        type: 'practice',
        content: 'Create beautiful generative patterns and animations',
        codeTemplate: 'function setup() {\n  createCanvas(400, 400);\n}\n\nfunction draw() {\n  // Your creative code here\n}',
        completed: true,
        xpReward: 100
      },
      {
        id: '2',
        title: 'Interactive Installations',
        type: 'project',
        content: 'Build responsive visual experiences',
        completed: false,
        xpReward: 150
      }
    ],
    completed: true,
    progress: 100,
    icon: 'Palette'
  },
  {
    id: '4',
    title: 'AI & Machine Learning Basics',
    description: 'Get started with artificial intelligence, neural networks, and machine learning algorithms.',
    category: 'AI',
    difficulty: 'Intermediate',
    type: 'ai-project',
    estimatedTime: '10 hours',
    xpReward: 600,
    hasCodeEditor: true,
    hasGameSimulation: false,
    modules: [
      {
        id: '1',
        title: 'Neural Network Fundamentals',
        type: 'theory',
        content: 'Understanding how neural networks work',
        completed: false,
        xpReward: 100
      },
      {
        id: '2',
        title: 'Build a Simple Chatbot',
        type: 'project',
        content: 'Create an AI chatbot using natural language processing',
        codeTemplate: 'class SimpleChatbot {\n  constructor() {\n    // Initialize your bot\n  }\n}',
        completed: false,
        xpReward: 200
      }
    ],
    completed: false,
    progress: 0,
    icon: 'Brain'
  },
  {
    id: '5',
    title: 'Professional Game Testing',
    description: 'Learn systematic approaches to game testing, bug reporting, and quality assurance.',
    category: 'Game Testing',
    difficulty: 'Beginner',
    type: 'interactive',
    estimatedTime: '4 hours',
    xpReward: 300,
    hasCodeEditor: false,
    hasGameSimulation: true,
    modules: [
      {
        id: '1',
        title: 'Testing Methodologies',
        type: 'theory',
        content: 'Learn different approaches to systematic game testing',
        completed: false,
        xpReward: 60
      },
      {
        id: '2',
        title: 'Bug Report Writing',
        type: 'practice',
        content: 'Master the art of clear, actionable bug reports',
        completed: false,
        xpReward: 80
      },
      {
        id: '3',
        title: 'Live Testing Session',
        type: 'challenge',
        content: 'Test a real game prototype and submit professional feedback',
        completed: false,
        xpReward: 160
      }
    ],
    completed: false,
    progress: 0,
    icon: 'TestTube'
  }
];

export const gameTests: GameTest[] = [
  {
    id: '1',
    title: 'Cyber Nexus Beta Test',
    description: 'Test the latest cyberpunk RPG focusing on combat mechanics and story progression.',
    gameType: 'RPG',
    difficulty: 'Medium',
    platform: 'PC/Console',
    developer: 'NeonStudios',
    testingPeriod: '2 weeks',
    xpReward: 450,
    bugsFound: 12,
    status: 'active',
    feedbackSubmitted: false,
    testingAreas: ['Combat System', 'UI/UX', 'Performance', 'Story Flow']
  },
  {
    id: '2',
    title: 'Mobile Racing Championship',
    description: 'Quality assurance testing for a new mobile racing game with multiplayer features.',
    gameType: 'Racing',
    difficulty: 'Easy',
    platform: 'Mobile',
    developer: 'SpeedWorks',
    testingPeriod: '1 week',
    xpReward: 300,
    bugsFound: 8,
    status: 'active',
    feedbackSubmitted: true,
    testingAreas: ['Multiplayer', 'Controls', 'Graphics', 'Monetization']
  },
  {
    id: '3',
    title: 'Fantasy Strategy Alpha',
    description: 'Early access testing for a complex strategy game with innovative mechanics.',
    gameType: 'Strategy',
    difficulty: 'Hard',
    platform: 'PC',
    developer: 'Epic Realms',
    testingPeriod: '3 weeks',
    xpReward: 650,
    bugsFound: 0,
    status: 'upcoming',
    feedbackSubmitted: false,
    testingAreas: ['Game Balance', 'AI Behavior', 'Resource Management', 'Multiplayer']
  }
];

export const skills: Skill[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the basics of React including components, props, and state management.',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    estimatedTime: '8 hours',
    xpReward: 250,
    prerequisites: [],
    lessons: [
      { id: '1', title: 'Components & JSX', type: 'video', duration: '45m', completed: true, xpReward: 50 },
      { id: '2', title: 'Props & State', type: 'video', duration: '60m', completed: true, xpReward: 60 },
      { id: '3', title: 'Event Handling', type: 'coding', duration: '30m', completed: true, xpReward: 40 },
      { id: '4', title: 'React Hooks', type: 'video', duration: '90m', completed: false, xpReward: 100 }
    ],
    completed: true,
    progress: 100,
    icon: 'Code'
  },
  {
    id: '2',
    title: 'TypeScript Mastery',
    description: 'Learn TypeScript from basics to advanced features for type-safe development.',
    category: 'Programming Languages',
    difficulty: 'Intermediate',
    estimatedTime: '12 hours',
    xpReward: 400,
    prerequisites: ['1'],
    lessons: [
      { id: '1', title: 'Type Basics', type: 'video', duration: '60m', completed: true, xpReward: 80 },
      { id: '2', title: 'Interfaces & Types', type: 'coding', duration: '45m', completed: true, xpReward: 70 },
      { id: '3', title: 'Generics', type: 'video', duration: '75m', completed: false, xpReward: 90 },
      { id: '4', title: 'Advanced Types', type: 'coding', duration: '90m', completed: false, xpReward: 160 }
    ],
    completed: true,
    progress: 100,
    icon: 'FileType'
  },
  {
    id: '3',
    title: 'Node.js Backend',
    description: 'Build scalable backend applications with Node.js and Express.',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    estimatedTime: '15 hours',
    xpReward: 500,
    prerequisites: ['2'],
    lessons: [
      { id: '1', title: 'Server Setup', type: 'video', duration: '45m', completed: true, xpReward: 60 },
      { id: '2', title: 'Express Framework', type: 'coding', duration: '90m', completed: true, xpReward: 120 },
      { id: '3', title: 'Database Integration', type: 'video', duration: '75m', completed: false, xpReward: 100 },
      { id: '4', title: 'API Security', type: 'coding', duration: '60m', completed: false, xpReward: 220 }
    ],
    completed: false,
    progress: 45,
    icon: 'Server'
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    category: 'Design',
    difficulty: 'Beginner',
    estimatedTime: '10 hours',
    xpReward: 350,
    prerequisites: [],
    lessons: [
      { id: '1', title: 'Design Thinking', type: 'video', duration: '60m', completed: false, xpReward: 80 },
      { id: '2', title: 'Color Theory', type: 'reading', duration: '30m', completed: false, xpReward: 50 },
      { id: '3', title: 'Typography', type: 'video', duration: '45m', completed: false, xpReward: 70 },
      { id: '4', title: 'Wireframing', type: 'quiz', duration: '90m', completed: false, xpReward: 150 }
    ],
    completed: false,
    progress: 0,
    icon: 'Palette'
  },
  {
    id: '5',
    title: 'Python Data Science',
    description: 'Analyze data and build machine learning models with Python.',
    category: 'Data Science',
    difficulty: 'Advanced',
    estimatedTime: '20 hours',
    xpReward: 600,
    prerequisites: [],
    lessons: [
      { id: '1', title: 'NumPy & Pandas', type: 'coding', duration: '120m', completed: true, xpReward: 150 },
      { id: '2', title: 'Data Visualization', type: 'coding', duration: '90m', completed: true, xpReward: 120 },
      { id: '3', title: 'Machine Learning', type: 'video', duration: '180m', completed: false, xpReward: 200 },
      { id: '4', title: 'Model Deployment', type: 'coding', duration: '120m', completed: false, xpReward: 130 }
    ],
    completed: true,
    progress: 100,
    icon: 'BarChart3'
  },
  {
    id: '6',
    title: 'DevOps Fundamentals',
    description: 'Learn containerization, CI/CD, and cloud deployment strategies.',
    category: 'DevOps',
    difficulty: 'Expert',
    estimatedTime: '25 hours',
    xpReward: 750,
    prerequisites: ['3'],
    lessons: [
      { id: '1', title: 'Docker Basics', type: 'video', duration: '90m', completed: false, xpReward: 120 },
      { id: '2', title: 'Kubernetes', type: 'coding', duration: '180m', completed: false, xpReward: 250 },
      { id: '3', title: 'CI/CD Pipelines', type: 'video', duration: '120m', completed: false, xpReward: 180 },
      { id: '4', title: 'Cloud Deployment', type: 'coding', duration: '150m', completed: false, xpReward: 200 }
    ],
    completed: false,
    progress: 0,
    icon: 'Cog'
  }
];

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'React Speed Challenge',
    description: 'Build a complete React app in 2 hours with specific requirements.',
    difficulty: 'Medium',
    timeLimit: '2 hours',
    xpReward: 300,
    participants: 127,
    deadline: '2024-12-25T23:59:59Z',
    category: 'Frontend Development',
    status: 'active'
  },
  {
    id: '2',
    title: 'Algorithm Marathon',
    description: 'Solve 10 challenging algorithms problems within the time limit.',
    difficulty: 'Hard',
    timeLimit: '3 hours',
    xpReward: 500,
    participants: 89,
    deadline: '2024-12-30T18:00:00Z',
    category: 'Algorithms',
    status: 'active'
  },
  {
    id: '3',
    title: 'Design Sprint',
    description: 'Create a complete mobile app design following modern UX principles.',
    difficulty: 'Medium',
    timeLimit: '4 hours',
    xpReward: 400,
    participants: 64,
    deadline: '2024-12-28T20:00:00Z',
    category: 'Design',
    status: 'upcoming'
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 15420,
    level: 18,
    skillsCompleted: 12,
    streak: 14
  },
  {
    rank: 2,
    user: {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 14780,
    level: 17,
    skillsCompleted: 11,
    streak: 9
  },
  {
    rank: 3,
    user: {
      id: '1',
      name: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 12750,
    level: 12,
    skillsCompleted: 8,
    streak: 7
  },
  {
    rank: 4,
    user: {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 11290,
    level: 11,
    skillsCompleted: 7,
    streak: 12
  },
  {
    rank: 5,
    user: {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 10650,
    level: 10,
    skillsCompleted: 6,
    streak: 5
  }
];