export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  badges: Badge[];
  completedSkills: string[];
  currentChallenges: Challenge[];
  tutorialsCompleted: string[];
  gameTestingStats: GameTestingStats;
  subscriptionTier: 'free' | 'student' | 'pro' | 'elite';
  earnings: number;
  pendingPayouts: number;
  referralCode: string;
  referredBy?: string;
  certificates: Certificate[];
  aiConversationHistory: AIMessage[];
  language: string;
  teamRole?: 'student' | 'instructor' | 'admin';
  teamId?: string;
}

export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  tokens?: number;
}

export interface Certificate {
  id: string;
  title: string;
  skillId: string;
  issuedAt: Date;
  certificateNumber: string;
  verificationHash: string;
  credentialUrl: string;
}

export interface MarketplaceItem {
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
  reviews: Review[];
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Team {
  id: string;
  name: string;
  adminId: string;
  members: TeamMember[];
  subscriptionType: 'classroom' | 'corporate';
  maxSeats: number;
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  role: 'student' | 'instructor' | 'admin';
  joinedAt: Date;
  progress: UserProgress[];
}

export interface UserProgress {
  skillId: string;
  progress: number;
  lastActive: Date;
  timeSpent: number;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  status: 'pending' | 'completed' | 'paid';
  reward: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  type: 'mentoring' | 'webinar' | 'testing' | 'study';
  startTime: Date;
  endTime: Date;
  attendees: string[];
  maxAttendees?: number;
  meetingLink?: string;
  createdBy: string;
}

export interface CommunityPost {
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
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  upvotes: number;
  createdAt: Date;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedTime: string;
  xpReward: number;
  prerequisites: string[];
  lessons: Lesson[];
  completed: boolean;
  progress: number;
  icon: string;
  certificateEligible: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'Gaming' | 'Coding' | 'Vibe Coding' | 'AI' | 'Game Testing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  type: 'interactive' | 'video' | 'coding' | 'game' | 'ai-project';
  estimatedTime: string;
  xpReward: number;
  modules: TutorialModule[];
  completed: boolean;
  progress: number;
  icon: string;
  hasCodeEditor: boolean;
  hasGameSimulation: boolean;
  price?: number;
  isPremium: boolean;
}

export interface TutorialModule {
  id: string;
  title: string;
  type: 'theory' | 'practice' | 'challenge' | 'project';
  content: string;
  codeTemplate?: string;
  expectedOutput?: string;
  completed: boolean;
  xpReward: number;
}

export interface GameTest {
  id: string;
  title: string;
  description: string;
  gameType: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  developer: string;
  testingPeriod: string;
  xpReward: number;
  bugsFound: number;
  status: 'active' | 'completed' | 'upcoming';
  feedbackSubmitted: boolean;
  testingAreas: string[];
  payout: number;
}

export interface GameTestingStats {
  totalBugReports: number;
  totalGamesInvolved: number;
  validBugs: number;
  feedbackScore: number;
  specializations: string[];
  totalEarnings: number;
  pendingPayouts: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'coding' | 'reading';
  duration: string;
  completed: boolean;
  xpReward: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  timeLimit: string;
  xpReward: number;
  participants: number;
  deadline: string;
  category: string;
  status: 'active' | 'completed' | 'upcoming';
  certificateEligible: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  earnedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  xp: number;
  level: number;
  skillsCompleted: number;
  streak: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'tutorial' | 'challenge' | 'assessment';
  contentId: string;
  order: number;
  estimatedTime: string;
  prerequisites: string[];
}

export interface CustomCurriculum {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  modules: CurriculumModule[];
  tags: string[];
  isPublic: boolean;
  enrollments: number;
  rating: number;
  createdAt: Date;
}

export interface TrialSession {
  sessionId: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: Date;
}