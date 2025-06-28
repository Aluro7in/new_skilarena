export interface GameTestingMethod {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  platform: string[];
  gameGenres: string[];
  testingType: string;
  duration: string;
  toolsRequired: string[];
  skills: string[];
  methodology: string[];
  deliverables: string[];
  payoutRange: string;
  xpReward: number;
  certification: string;
  requirements: string[];
  examples: string[];
}

export function generateGameTestingMethods(): GameTestingMethod[] {
  const categories = [
    'Functional Testing',
    'Performance Testing',
    'Usability Testing',
    'Compatibility Testing',
    'Security Testing',
    'Localization Testing',
    'Accessibility Testing',
    'Beta Testing',
    'Alpha Testing',
    'Regression Testing',
    'Load Testing',
    'Stress Testing',
    'Compliance Testing',
    'Integration Testing',
    'Multiplayer Testing'
  ];

  const platforms = [
    ['PC', 'Windows'],
    ['Console', 'PlayStation', 'Xbox'],
    ['Mobile', 'iOS', 'Android'],
    ['VR', 'Oculus', 'PICO'],
    ['Web', 'Browser-based'],
    ['Cross-platform'],
    ['Cloud Gaming'],
    ['Nintendo Switch'],
    ['Steam Deck'],
    ['AR', 'Mixed Reality']
  ];

  const gameGenres = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports', 'Racing',
    'Puzzle', 'Platformer', 'Shooter', 'Fighting', 'Horror', 'Survival',
    'MMORPG', 'MOBA', 'Battle Royale', 'Casual', 'Educational', 'Music'
  ];

  const testingMethods: GameTestingMethod[] = [];

  // Generate 100+ comprehensive testing methods
  for (let i = 0; i < 150; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const genre = gameGenres[Math.floor(Math.random() * gameGenres.length)];
    
    const methodTemplates = {
      'Functional Testing': {
        titles: [
          'Core Gameplay Mechanics Validation',
          'User Interface Functionality Testing',
          'Game Logic Verification',
          'Feature Implementation Testing',
          'Save/Load System Testing',
          'Achievement System Validation',
          'Progression System Testing',
          'Combat System Analysis',
          'Inventory Management Testing',
          'Quest System Validation'
        ],
        descriptions: [
          'Comprehensive testing of core game mechanics to ensure proper functionality',
          'Detailed validation of user interface elements and interactions',
          'Systematic verification of game logic and rule implementation',
          'Testing newly implemented features for correct behavior',
          'Validation of save/load functionality across different scenarios'
        ]
      },
      'Performance Testing': {
        titles: [
          'Frame Rate Analysis',
          'Memory Usage Optimization',
          'Loading Time Assessment',
          'GPU Performance Testing',
          'CPU Utilization Analysis',
          'Battery Life Testing (Mobile)',
          'Network Performance Testing',
          'Asset Streaming Testing',
          'Optimization Validation',
          'Benchmark Comparison'
        ],
        descriptions: [
          'Analyze frame rates across different hardware configurations',
          'Monitor and optimize memory usage patterns',
          'Measure and improve loading times for various game elements',
          'Test GPU performance under different graphics settings',
          'Analyze CPU utilization and identify bottlenecks'
        ]
      },
      'Usability Testing': {
        titles: [
          'User Experience Evaluation',
          'Control Scheme Testing',
          'Accessibility Assessment',
          'Learning Curve Analysis',
          'Navigation Flow Testing',
          'Tutorial Effectiveness',
          'Menu System Usability',
          'Player Onboarding Testing',
          'Information Architecture',
          'Cognitive Load Assessment'
        ],
        descriptions: [
          'Evaluate overall user experience and player satisfaction',
          'Test control schemes for intuitiveness and responsiveness',
          'Assess game accessibility for players with disabilities',
          'Analyze the learning curve for new players',
          'Test navigation flow and user journey'
        ]
      }
    };

    const template = methodTemplates[category] || methodTemplates['Functional Testing'];
    const title = template.titles[Math.floor(Math.random() * template.titles.length)];
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];

    testingMethods.push({
      id: `test_method_${i + 1}`,
      title: `${title} - ${genre} Games`,
      description: `${description} specifically tailored for ${genre.toLowerCase()} games on ${platform.join('/')} platform(s).`,
      category,
      difficulty: ['Easy', 'Medium', 'Hard', 'Expert'][Math.floor(Math.random() * 4)] as any,
      platform: platform,
      gameGenres: [genre, gameGenres[Math.floor(Math.random() * gameGenres.length)]],
      testingType: category,
      duration: ['1-2 hours', '2-4 hours', '4-8 hours', '1-2 days', '3-5 days'][Math.floor(Math.random() * 5)],
      toolsRequired: [
        'Game Testing Suite',
        'Performance Monitoring Tools',
        'Bug Tracking Software',
        'Screen Recording Tools',
        'Analytics Dashboard',
        'Device Testing Kit',
        'Network Simulation Tools',
        'Automated Testing Framework'
      ].slice(0, Math.floor(Math.random() * 4) + 2),
      skills: [
        'Attention to Detail',
        'Analytical Thinking',
        'Communication Skills',
        'Gaming Experience',
        'Technical Knowledge',
        'Problem Solving',
        'Documentation Skills',
        'Critical Thinking'
      ].slice(0, Math.floor(Math.random() * 3) + 3),
      methodology: [
        'Create detailed test cases',
        'Execute systematic testing procedures',
        'Document findings and bugs',
        'Perform regression testing',
        'Validate bug fixes',
        'Generate comprehensive reports',
        'Collaborate with development team',
        'Provide actionable feedback'
      ],
      deliverables: [
        'Detailed test report',
        'Bug documentation',
        'Performance metrics',
        'Video evidence',
        'Recommendations',
        'Test case results',
        'Comparative analysis',
        'Executive summary'
      ],
      payoutRange: ['$50-100', '$100-200', '$200-400', '$400-800', '$800-1500'][Math.floor(Math.random() * 5)],
      xpReward: Math.floor(Math.random() * 400) + 100,
      certification: `${category} Specialist Certificate`,
      requirements: [
        'Previous testing experience',
        'Gaming background',
        'Technical aptitude',
        'Communication skills',
        'Reliability and punctuality',
        'Attention to detail'
      ].slice(0, Math.floor(Math.random() * 3) + 2),
      examples: [
        'Successfully tested 15+ games in this category',
        'Identified 50+ critical bugs in similar projects',
        'Improved game performance by 25% through testing',
        'Reduced player churn by 15% through UX improvements',
        'Achieved 98% test coverage on major releases'
      ].slice(0, Math.floor(Math.random() * 2) + 1)
    });
  }

  return testingMethods;
}

export const gameTestingMethods = generateGameTestingMethods();

// Specialized collections
export const functionalTestingMethods = gameTestingMethods.filter(m => m.category === 'Functional Testing');
export const performanceTestingMethods = gameTestingMethods.filter(m => m.category === 'Performance Testing');
export const usabilityTestingMethods = gameTestingMethods.filter(m => m.category === 'Usability Testing');
export const mobileTestingMethods = gameTestingMethods.filter(m => m.platform.some(p => ['Mobile', 'iOS', 'Android'].includes(p)));
export const vrTestingMethods = gameTestingMethods.filter(m => m.platform.some(p => ['VR', 'Oculus', 'PICO'].includes(p)));
export const expertTestingMethods = gameTestingMethods.filter(m => m.difficulty === 'Expert');
export const beginnerTestingMethods = gameTestingMethods.filter(m => m.difficulty === 'Easy');