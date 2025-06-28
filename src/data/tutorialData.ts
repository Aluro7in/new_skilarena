import { Tutorial, TutorialModule } from '../types';

export function generateTutorials(): Tutorial[] {
  const categories = ['Gaming', 'Coding', 'Vibe Coding', 'AI', 'Game Testing', 'Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity', 'DevOps'];
  
  const tutorialTemplates = [
    {
      title: 'Complete {{category}} Masterclass',
      description: 'Comprehensive guide to mastering {{category}} from beginner to expert level',
      modules: [
        'Introduction to {{category}}',
        'Setting Up Your Environment',
        'Basic Concepts and Fundamentals',
        'Intermediate Techniques',
        'Advanced Strategies',
        'Best Practices and Optimization',
        'Real-World Projects',
        'Deployment and Production',
        'Troubleshooting and Debugging',
        'Future Trends and Technologies'
      ]
    },
    {
      title: 'Practical {{category}} for Beginners',
      description: 'Learn {{category}} through hands-on projects and practical examples',
      modules: [
        'Getting Started with {{category}}',
        'Your First {{category}} Project',
        'Understanding Core Concepts',
        'Building Interactive Features',
        'Adding Advanced Functionality',
        'Testing and Quality Assurance',
        'Performance Optimization',
        'Final Project and Portfolio'
      ]
    },
    {
      title: 'Advanced {{category}} Techniques',
      description: 'Master advanced {{category}} concepts and professional workflows',
      modules: [
        'Advanced {{category}} Architecture',
        'Performance and Scalability',
        'Security Best Practices',
        'Integration Patterns',
        'Monitoring and Analytics',
        'Professional Development Workflow',
        'Industry Case Studies',
        'Expert Tips and Tricks'
      ]
    },
    {
      title: '{{category}} Workshop Series',
      description: 'Interactive workshop-style learning with live coding and projects',
      modules: [
        'Workshop 1: Foundation Building',
        'Workshop 2: Core Implementation',
        'Workshop 3: Feature Development',
        'Workshop 4: Advanced Patterns',
        'Workshop 5: Real-World Application',
        'Workshop 6: Performance Tuning',
        'Workshop 7: Production Deployment',
        'Workshop 8: Maintenance and Updates'
      ]
    }
  ];

  const tutorials: Tutorial[] = [];
  let tutorialId = 1;

  categories.forEach(category => {
    // Create 15-20 tutorials per category
    const tutorialCount = Math.floor(Math.random() * 6) + 15;
    
    for (let i = 0; i < tutorialCount; i++) {
      const template = tutorialTemplates[Math.floor(Math.random() * tutorialTemplates.length)];
      
      const modules: TutorialModule[] = template.modules.map((moduleTitle, index) => ({
        id: `module_${tutorialId}_${index + 1}`,
        title: moduleTitle.replace('{{category}}', category),
        type: ['theory', 'practice', 'challenge', 'project'][Math.floor(Math.random() * 4)] as any,
        content: `This module covers essential aspects of ${moduleTitle.toLowerCase().replace('{{category}}', category.toLowerCase())}. You'll learn through interactive examples, hands-on exercises, and real-world applications.`,
        codeTemplate: category.includes('Coding') || category === 'Web Development' ? `// ${moduleTitle} example\nfunction example() {\n  // Your code here\n  console.log('Learning ${category}!');\n}` : undefined,
        expectedOutput: category.includes('Coding') ? 'Expected output will vary based on your implementation' : undefined,
        completed: Math.random() > 0.7,
        xpReward: Math.floor(Math.random() * 100) + 50
      }));

      const completedModules = modules.filter(m => m.completed).length;
      const progress = Math.floor((completedModules / modules.length) * 100);

      tutorials.push({
        id: tutorialId.toString(),
        title: template.title.replace('{{category}}', category),
        description: template.description.replace(/{{category}}/g, category),
        category: category as any,
        difficulty: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)] as any,
        type: ['interactive', 'video', 'coding', 'game', 'ai-project'][Math.floor(Math.random() * 5)] as any,
        estimatedTime: `${Math.floor(Math.random() * 20) + 5} hours`,
        xpReward: Math.floor(Math.random() * 500) + 200,
        modules,
        completed: progress === 100,
        progress,
        icon: {
          'Gaming': 'Gamepad2',
          'Coding': 'Code2',
          'Vibe Coding': 'Palette',
          'AI': 'Brain',
          'Game Testing': 'TestTube',
          'Web Development': 'Globe',
          'Mobile Development': 'Smartphone',
          'Data Science': 'BarChart3',
          'Cybersecurity': 'Shield',
          'DevOps': 'Settings'
        }[category] || 'BookOpen',
        hasCodeEditor: ['Coding', 'Web Development', 'Mobile Development', 'Data Science'].includes(category),
        hasGameSimulation: ['Gaming', 'Game Testing'].includes(category),
        price: Math.random() > 0.7 ? Math.floor(Math.random() * 100) + 20 : undefined,
        isPremium: Math.random() > 0.6
      });

      tutorialId++;
    }
  });

  return tutorials;
}

export const comprehensiveTutorials = generateTutorials();

// Specialized tutorial collections
export const beginnerTutorials = comprehensiveTutorials.filter(t => t.difficulty === 'Beginner');
export const advancedTutorials = comprehensiveTutorials.filter(t => t.difficulty === 'Advanced' || t.difficulty === 'Expert');
export const codingTutorials = comprehensiveTutorials.filter(t => t.hasCodeEditor);
export const gamingTutorials = comprehensiveTutorials.filter(t => t.category === 'Gaming' || t.category === 'Game Testing');
export const premiumTutorials = comprehensiveTutorials.filter(t => t.isPremium);
export const freeTutorials = comprehensiveTutorials.filter(t => !t.isPremium);