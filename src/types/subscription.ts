export type SubscriptionTier = 'freemium' | 'premium' | 'teams';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';

export interface SubscriptionLimits {
  skillsPerMonth: number;
  tutorialsPerMonth: number;
  gameTestingOpportunities: number;
  challengesPerWeek: number;
  aiQuestionsPerDay: number;
  certificatesPerYear: number;
  storageGB: number;
  teamMembers?: number;
  prioritySupport: boolean;
  advancedAnalytics: boolean;
  customBranding: boolean;
  apiAccess: boolean;
  mentoringSessions: number;
  portfolioProjects: number;
}

export interface SubscriptionFeatures {
  // Core Learning
  basicSkills: boolean;
  premiumSkills: boolean;
  expertSkills: boolean;
  interactiveTutorials: boolean;
  premiumTutorials: boolean;
  liveWebinars: boolean;
  
  // Game Testing
  basicGameTesting: boolean;
  premiumGameTesting: boolean;
  exclusiveStudios: boolean;
  higherPayouts: boolean;
  priorityMatching: boolean;
  
  // Certifications & Career
  basicCertificates: boolean;
  professionalCertificates: boolean;
  industryRecognition: boolean;
  careerCoaching: boolean;
  jobPlacement: boolean;
  
  // Collaboration & Teams
  studyGroups: boolean;
  teamWorkspaces: boolean;
  adminDashboard: boolean;
  teamAnalytics: boolean;
  userManagement: boolean;
  roleBasedAccess: boolean;
  
  // Advanced Features
  aiAssistant: boolean;
  unlimitedAI: boolean;
  customCurriculum: boolean;
  whiteLabel: boolean;
  apiIntegration: boolean;
  advancedReporting: boolean;
  
  // Support & Services
  communitySupport: boolean;
  emailSupport: boolean;
  prioritySupport: boolean;
  dedicatedManager: boolean;
  onboarding: boolean;
  training: boolean;
}

export interface SubscriptionTierConfig {
  id: SubscriptionTier;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  stripeMonthlyPriceId: string;
  stripeYearlyPriceId: string;
  features: SubscriptionFeatures;
  limits: SubscriptionLimits;
  popular?: boolean;
  badge?: string;
  color: string;
  icon: string;
}

export interface UserSubscriptionData {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  teamId?: string;
  teamRole?: 'member' | 'admin' | 'owner';
  usage: {
    skillsThisMonth: number;
    tutorialsThisMonth: number;
    gameTestingThisMonth: number;
    challengesThisWeek: number;
    aiQuestionsToday: number;
    certificatesThisYear: number;
    storageUsedGB: number;
  };
}

export interface TeamSubscription {
  id: string;
  name: string;
  ownerId: string;
  adminIds: string[];
  memberIds: string[];
  maxMembers: number;
  subscription: UserSubscriptionData;
  settings: {
    allowMemberInvites: boolean;
    requireApproval: boolean;
    defaultRole: 'member' | 'admin';
    features: {
      enableAnalytics: boolean;
      enableCustomBranding: boolean;
      enableApiAccess: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}