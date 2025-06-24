import { SubscriptionTierConfig } from '../types/subscription';

export const subscriptionTiers: SubscriptionTierConfig[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    description: 'Perfect for getting started with game development and testing',
    monthlyPrice: 0,
    yearlyPrice: 0,
    stripeMonthlyPriceId: '',
    stripeYearlyPriceId: '',
    color: 'from-gray-500 to-gray-600',
    icon: 'BookOpen',
    features: {
      // Core Learning - Limited
      basicSkills: true,
      premiumSkills: false,
      expertSkills: false,
      interactiveTutorials: true,
      premiumTutorials: false,
      liveWebinars: false,
      
      // Game Testing - Very Limited
      basicGameTesting: true,
      premiumGameTesting: false,
      exclusiveStudios: false,
      higherPayouts: false,
      priorityMatching: false,
      
      // Certifications & Career - Basic Only
      basicCertificates: true,
      professionalCertificates: false,
      industryRecognition: false,
      careerCoaching: false,
      jobPlacement: false,
      
      // Collaboration & Teams - Community Only
      studyGroups: true,
      teamWorkspaces: false,
      adminDashboard: false,
      teamAnalytics: false,
      userManagement: false,
      roleBasedAccess: false,
      
      // Advanced Features - None
      aiAssistant: true,
      unlimitedAI: false,
      customCurriculum: false,
      whiteLabel: false,
      apiIntegration: false,
      advancedReporting: false,
      
      // Support & Services - Community Only
      communitySupport: true,
      emailSupport: false,
      prioritySupport: false,
      dedicatedManager: false,
      onboarding: false,
      training: false,
    },
    limits: {
      skillsPerMonth: 3,
      tutorialsPerMonth: 2,
      gameTestingOpportunities: 1,
      challengesPerWeek: 2,
      aiQuestionsPerDay: 5,
      certificatesPerYear: 1,
      storageGB: 1,
      prioritySupport: false,
      advancedAnalytics: false,
      customBranding: false,
      apiAccess: false,
      mentoringSessions: 0,
      portfolioProjects: 1,
    },
  },
  {
    id: 'premium',
    name: 'Premium Individual',
    description: 'Unlock your full potential with unlimited access and premium features',
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    stripeMonthlyPriceId: 'price_1RctxSRtl07aE8XKVTIjMkyp',
    stripeYearlyPriceId: 'price_1RctxSRtl07aE8XKVTIjMkyp',
    color: 'from-purple-500 to-blue-500',
    icon: 'Crown',
    popular: true,
    badge: 'Most Popular',
    features: {
      // Core Learning - Full Access
      basicSkills: true,
      premiumSkills: true,
      expertSkills: true,
      interactiveTutorials: true,
      premiumTutorials: true,
      liveWebinars: true,
      
      // Game Testing - Premium Access
      basicGameTesting: true,
      premiumGameTesting: true,
      exclusiveStudios: true,
      higherPayouts: true,
      priorityMatching: true,
      
      // Certifications & Career - Professional
      basicCertificates: true,
      professionalCertificates: true,
      industryRecognition: true,
      careerCoaching: true,
      jobPlacement: false,
      
      // Collaboration & Teams - Individual Focus
      studyGroups: true,
      teamWorkspaces: false,
      adminDashboard: false,
      teamAnalytics: false,
      userManagement: false,
      roleBasedAccess: false,
      
      // Advanced Features - Some Access
      aiAssistant: true,
      unlimitedAI: true,
      customCurriculum: true,
      whiteLabel: false,
      apiIntegration: false,
      advancedReporting: true,
      
      // Support & Services - Premium
      communitySupport: true,
      emailSupport: true,
      prioritySupport: true,
      dedicatedManager: false,
      onboarding: true,
      training: false,
    },
    limits: {
      skillsPerMonth: -1, // Unlimited
      tutorialsPerMonth: -1,
      gameTestingOpportunities: -1,
      challengesPerWeek: -1,
      aiQuestionsPerDay: -1,
      certificatesPerYear: -1,
      storageGB: 50,
      prioritySupport: true,
      advancedAnalytics: true,
      customBranding: false,
      apiAccess: false,
      mentoringSessions: 2,
      portfolioProjects: -1,
    },
  },
  {
    id: 'teams',
    name: 'Teams & Enterprise',
    description: 'Powerful collaboration tools for educational institutions and organizations',
    monthlyPrice: 39.99,
    yearlyPrice: 399.99,
    stripeMonthlyPriceId: 'price_1RctxSRtl07aE8XKVTIjMkyp',
    stripeYearlyPriceId: 'price_1RctxSRtl07aE8XKVTIjMkyp',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Users',
    badge: 'Best for Teams',
    features: {
      // Core Learning - Full Access
      basicSkills: true,
      premiumSkills: true,
      expertSkills: true,
      interactiveTutorials: true,
      premiumTutorials: true,
      liveWebinars: true,
      
      // Game Testing - Full Access
      basicGameTesting: true,
      premiumGameTesting: true,
      exclusiveStudios: true,
      higherPayouts: true,
      priorityMatching: true,
      
      // Certifications & Career - Enterprise
      basicCertificates: true,
      professionalCertificates: true,
      industryRecognition: true,
      careerCoaching: true,
      jobPlacement: true,
      
      // Collaboration & Teams - Full Suite
      studyGroups: true,
      teamWorkspaces: true,
      adminDashboard: true,
      teamAnalytics: true,
      userManagement: true,
      roleBasedAccess: true,
      
      // Advanced Features - Enterprise
      aiAssistant: true,
      unlimitedAI: true,
      customCurriculum: true,
      whiteLabel: true,
      apiIntegration: true,
      advancedReporting: true,
      
      // Support & Services - Enterprise
      communitySupport: true,
      emailSupport: true,
      prioritySupport: true,
      dedicatedManager: true,
      onboarding: true,
      training: true,
    },
    limits: {
      skillsPerMonth: -1,
      tutorialsPerMonth: -1,
      gameTestingOpportunities: -1,
      challengesPerWeek: -1,
      aiQuestionsPerDay: -1,
      certificatesPerYear: -1,
      storageGB: 500,
      teamMembers: 50,
      prioritySupport: true,
      advancedAnalytics: true,
      customBranding: true,
      apiAccess: true,
      mentoringSessions: -1,
      portfolioProjects: -1,
    },
  },
];

export function getSubscriptionTier(tierId: string) {
  return subscriptionTiers.find(tier => tier.id === tierId);
}

export function getUserTierFeatures(tier: string) {
  const tierConfig = getSubscriptionTier(tier);
  return tierConfig?.features || subscriptionTiers[0].features;
}

export function getUserTierLimits(tier: string) {
  const tierConfig = getSubscriptionTier(tier);
  return tierConfig?.limits || subscriptionTiers[0].limits;
}

export function canAccessFeature(userTier: string, feature: keyof SubscriptionTierConfig['features']): boolean {
  const features = getUserTierFeatures(userTier);
  return features[feature] || false;
}

export function isWithinLimits(userTier: string, limitType: keyof SubscriptionTierConfig['limits'], currentUsage: number): boolean {
  const limits = getUserTierLimits(userTier);
  const limit = limits[limitType];
  
  if (typeof limit === 'number') {
    return limit === -1 || currentUsage < limit;
  }
  
  return limit === true;
}

export function getRemainingUsage(userTier: string, limitType: keyof SubscriptionTierConfig['limits'], currentUsage: number): number {
  const limits = getUserTierLimits(userTier);
  const limit = limits[limitType];
  
  if (typeof limit === 'number') {
    return limit === -1 ? -1 : Math.max(0, limit - currentUsage);
  }
  
  return -1;
}