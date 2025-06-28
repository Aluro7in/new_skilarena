import { Skill, Lesson } from '../types';

export function generateSkills(): Skill[] {
  const categories = [
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'Game Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Database Management',
    'Cloud Computing',
    'Blockchain',
    'Quality Assurance',
    'Project Management',
    'Digital Marketing',
    'Graphics Design',
    '3D Modeling',
    'Animation',
    'Audio Production',
    'Video Editing',
    'System Administration',
    'Network Engineering',
    'Embedded Systems',
    'AR/VR Development',
    'Robotics'
  ];

  const technologies = {
    'Frontend Development': ['React', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS'],
    'Backend Development': ['Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Express.js', 'Django'],
    'Mobile Development': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic', 'Java', 'Objective-C'],
    'Game Development': ['Unity', 'Unreal Engine', 'Godot', 'C#', 'C++', 'Blender', 'Maya', '3D Modeling', 'Game Design'],
    'Data Science': ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'Tableau', 'Power BI'],
    'Machine Learning': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Computer Vision', 'Deep Learning'],
    'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'AWS', 'Azure', 'Terraform', 'Ansible', 'Monitoring'],
    'Cybersecurity': ['Penetration Testing', 'Network Security', 'Cryptography', 'Incident Response', 'Malware Analysis', 'OWASP'],
    'UI/UX Design': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems'],
    'Database Management': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server', 'Database Design', 'Optimization'],
    'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Serverless', 'Microservices', 'Cloud Architecture', 'DevOps'],
    'Blockchain': ['Ethereum', 'Solidity', 'Web3', 'Smart Contracts', 'DeFi', 'NFTs', 'Cryptocurrency', 'Consensus'],
    'Quality Assurance': ['Selenium', 'Jest', 'Cypress', 'API Testing', 'Performance Testing', 'Test Automation', 'Manual Testing'],
    'Project Management': ['Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'Risk Management', 'Team Leadership'],
    'Digital Marketing': ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing', 'PPC'],
    'Graphics Design': ['Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Branding', 'Layout Design', 'Color Theory'],
    '3D Modeling': ['Blender', 'Maya', 'ZBrush', 'Substance', 'Modeling', 'Texturing', 'Rigging', 'Lighting'],
    'Animation': ['After Effects', 'Cinema 4D', '2D Animation', '3D Animation', 'Motion Graphics', 'Character Animation'],
    'Audio Production': ['Pro Tools', 'Logic Pro', 'Ableton', 'Sound Design', 'Mixing', 'Mastering', 'MIDI'],
    'Video Editing': ['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Color Grading', 'Motion Graphics', 'Compositing'],
    'System Administration': ['Linux', 'Windows Server', 'PowerShell', 'Bash', 'Network Management', 'Security', 'Monitoring'],
    'Network Engineering': ['Cisco', 'Routing', 'Switching', 'Firewalls', 'VPNs', 'Network Design', 'Troubleshooting'],
    'Embedded Systems': ['Arduino', 'Raspberry Pi', 'C/C++', 'IoT', 'Microcontrollers', 'Real-time Systems', 'Hardware'],
    'AR/VR Development': ['Unity', 'Unreal Engine', 'ARCore', 'ARKit', 'WebXR', 'VR Optimization', 'Spatial Computing'],
    'Robotics': ['ROS', 'Python', 'C++', 'Computer Vision', 'Control Systems', 'Path Planning', 'Sensor Integration']
  };

  const skills: Skill[] = [];
  let skillId = 1;

  categories.forEach(category => {
    const categoryTechnologies = technologies[category] || ['General', 'Fundamentals', 'Advanced', 'Professional'];
    
    categoryTechnologies.forEach(technology => {
      // Create 3-5 skills per technology
      const skillCount = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < skillCount; i++) {
        const skillLevels = ['Fundamentals', 'Intermediate', 'Advanced', 'Expert', 'Mastery'];
        const skillLevel = skillLevels[i] || skillLevels[Math.floor(Math.random() * skillLevels.length)];
        
        const lessons: Lesson[] = [];
        const lessonCount = Math.floor(Math.random() * 8) + 4;
        
        for (let j = 0; j < lessonCount; j++) {
          const lessonTypes = ['video', 'quiz', 'coding', 'reading'];
          const lessonType = lessonTypes[Math.floor(Math.random() * lessonTypes.length)];
          
          lessons.push({
            id: `lesson_${skillId}_${j + 1}`,
            title: `${technology} ${skillLevel} - Part ${j + 1}`,
            type: lessonType as any,
            duration: `${Math.floor(Math.random() * 60) + 15}m`,
            completed: Math.random() > 0.6,
            xpReward: Math.floor(Math.random() * 100) + 25
          });
        }

        const completedLessons = lessons.filter(l => l.completed).length;
        const progress = Math.floor((completedLessons / lessons.length) * 100);
        const isCompleted = progress === 100;

        skills.push({
          id: skillId.toString(),
          title: `${technology} ${skillLevel}`,
          description: `Master ${skillLevel.toLowerCase()} concepts in ${technology} for ${category.toLowerCase()}. This comprehensive course covers essential techniques, best practices, and real-world applications.`,
          category,
          difficulty: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)] as any,
          estimatedTime: `${Math.floor(Math.random() * 20) + 5} hours`,
          xpReward: Math.floor(Math.random() * 400) + 150,
          prerequisites: skillId > 1 ? [`${Math.max(1, skillId - Math.floor(Math.random() * 3) - 1)}`] : [],
          lessons,
          completed: isCompleted,
          progress,
          icon: {
            'Frontend Development': 'Code',
            'Backend Development': 'Server',
            'Mobile Development': 'Smartphone',
            'Game Development': 'Gamepad2',
            'Data Science': 'BarChart3',
            'Machine Learning': 'Brain',
            'DevOps': 'Cog',
            'Cybersecurity': 'Shield',
            'UI/UX Design': 'Palette',
            'Database Management': 'Database',
            'Cloud Computing': 'Cloud',
            'Blockchain': 'Link',
            'Quality Assurance': 'TestTube',
            'Project Management': 'Users',
            'Digital Marketing': 'TrendingUp',
            'Graphics Design': 'Image',
            '3D Modeling': 'Box',
            'Animation': 'Play',
            'Audio Production': 'Music',
            'Video Editing': 'Video',
            'System Administration': 'Settings',
            'Network Engineering': 'Wifi',
            'Embedded Systems': 'Cpu',
            'AR/VR Development': 'Glasses',
            'Robotics': 'Bot'
          }[category] || 'BookOpen',
          certificateEligible: true
        });

        skillId++;
      }
    });
  });

  return skills;
}

export const comprehensiveSkills = generateSkills();

// Skill collections for easy access
export const beginnerSkills = comprehensiveSkills.filter(s => s.difficulty === 'Beginner');
export const intermediateSkills = comprehensiveSkills.filter(s => s.difficulty === 'Intermediate');
export const advancedSkills = comprehensiveSkills.filter(s => s.difficulty === 'Advanced');
export const expertSkills = comprehensiveSkills.filter(s => s.difficulty === 'Expert');

export const frontendSkills = comprehensiveSkills.filter(s => s.category === 'Frontend Development');
export const backendSkills = comprehensiveSkills.filter(s => s.category === 'Backend Development');
export const gameDevSkills = comprehensiveSkills.filter(s => s.category === 'Game Development');
export const dataScienceSkills = comprehensiveSkills.filter(s => s.category === 'Data Science');

export const completedSkills = comprehensiveSkills.filter(s => s.completed);
export const inProgressSkills = comprehensiveSkills.filter(s => s.progress > 0 && !s.completed);
export const certificateEligibleSkills = comprehensiveSkills.filter(s => s.certificateEligible);