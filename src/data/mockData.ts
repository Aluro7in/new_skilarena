import { User, Badge, LeaderboardEntry, GameTest } from '../types';
import { comprehensiveTutorials } from './tutorialData';
import { comprehensiveSkills } from './skillsData';
import { comprehensiveChallenges } from './challengesData';
import { gameTestingMethods } from './gameTestingData';

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
    },
    {
      id: '5',
      name: 'Tutorial Master',
      description: 'Completed 50 tutorials across different categories',
      icon: 'GraduationCap',
      rarity: 'Legendary',
      earnedAt: '2024-02-20'
    },
    {
      id: '6',
      name: 'Challenge Champion',
      description: 'Won 10 competitive challenges',
      icon: 'Crown',
      rarity: 'Legendary',
      earnedAt: '2024-02-25'
    }
  ],
  completedSkills: comprehensiveSkills.filter(s => s.completed).map(s => s.id).slice(0, 15),
  currentChallenges: [],
  tutorialsCompleted: comprehensiveTutorials.filter(t => t.completed).map(t => t.id).slice(0, 8),
  gameTestingStats: {
    totalBugReports: 127,
    totalGamesInvolved: 23,
    validBugs: 118,
    feedbackScore: 4.8,
    specializations: ['UI/UX Testing', 'Performance Testing', 'Gameplay Balance', 'Mobile Testing', 'VR Testing'],
    totalEarnings: 2850,
    pendingPayouts: 450
  },
  subscriptionTier: 'pro' as any,
  earnings: 2850,
  pendingPayouts: 450,
  referralCode: 'ALEX2024',
  certificates: [],
  aiConversationHistory: [],
  language: 'en'
};

// Generate comprehensive game tests from testing methods
export const gameTests: GameTest[] = gameTestingMethods.slice(0, 50).map((method, index) => ({
  id: `gametest_${index + 1}`,
  title: method.title,
  description: method.description,
  gameType: method.gameGenres[0],
  difficulty: method.difficulty,
  platform: method.platform.join('/'),
  developer: ['NeonStudios', 'PixelCraft Games', 'IndieDev Studios', 'AAA Gaming Corp', 'Mobile Masters'][index % 5],
  testingPeriod: method.duration,
  xpReward: method.xpReward,
  bugsFound: Math.floor(Math.random() * 20),
  status: ['active', 'completed', 'upcoming'][Math.floor(Math.random() * 3)] as any,
  feedbackSubmitted: Math.random() > 0.5,
  testingAreas: method.methodology.slice(0, 4),
  payout: parseInt(method.payoutRange.split('-')[0].replace('$', ''))
}));

// Use the comprehensive data
export const tutorials = comprehensiveTutorials;
export const skills = comprehensiveSkills;
export const challenges = comprehensiveChallenges;

// Enhanced leaderboard with more realistic data
export const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 25420,
    level: 28,
    skillsCompleted: 45,
    streak: 21
  },
  {
    rank: 2,
    user: {
      id: '3',
      name: 'Marcus Rodriguez',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 23780,
    level: 26,
    skillsCompleted: 42,
    streak: 18
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
    skillsCompleted: 15,
    streak: 7
  },
  {
    rank: 4,
    user: {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 21290,
    level: 24,
    skillsCompleted: 38,
    streak: 15
  },
  {
    rank: 5,
    user: {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    xp: 19650,
    level: 22,
    skillsCompleted: 35,
    streak: 12
  },
  // Add more leaderboard entries
  ...Array.from({ length: 95 }, (_, i) => ({
    rank: i + 6,
    user: {
      id: `user_${i + 6}`,
      name: `Developer ${i + 6}`,
      avatar: `https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`
    },
    xp: Math.floor(Math.random() * 18000) + 1000,
    level: Math.floor(Math.random() * 20) + 2,
    skillsCompleted: Math.floor(Math.random() * 30) + 5,
    streak: Math.floor(Math.random() * 50)
  }))
];