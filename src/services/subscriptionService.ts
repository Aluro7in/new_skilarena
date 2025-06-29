import { UserSubscriptionData, SubscriptionTier, TeamSubscription } from '../types/subscription';
import { supabaseService } from './supabase';
import { subscriptionTiers, canAccessFeature, isWithinLimits } from '../config/subscriptionTiers';

export class SubscriptionService {
  private static instance: SubscriptionService;
  private userSubscription: UserSubscriptionData | null = null;
  private teamSubscription: TeamSubscription | null = null;

  static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  async getCurrentUserSubscription(): Promise<UserSubscriptionData> {
    try {
      const user = await supabaseService.getCurrentUser();
      if (!user || supabaseService.isUsingDemoMode) {
        // Return a premium subscription for demo mode to showcase all features
        return {
          tier: 'premium',
          status: 'active',
          usage: {
            skillsThisMonth: 5,
            tutorialsThisMonth: 3,
            gameTestingThisMonth: 2,
            challengesThisWeek: 1,
            aiQuestionsToday: 10,
            certificatesThisYear: 2,
            storageUsedGB: 1.5,
          },
        };
      }

      const subscription = await supabaseService.getUserSubscription();
      
      if (!subscription) {
        return this.getDefaultSubscription();
      }

      // Mock usage data - in real app, this would come from database
      const usage = {
        skillsThisMonth: 1,
        tutorialsThisMonth: 0,
        gameTestingThisMonth: 0,
        challengesThisWeek: 1,
        aiQuestionsToday: 3,
        certificatesThisYear: 0,
        storageUsedGB: 0.1,
      };

      this.userSubscription = {
        tier: this.mapStripeTierToSubscriptionTier(subscription.price_id),
        status: subscription.subscription_status as any,
        currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : undefined,
        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : undefined,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        usage,
      };

      return this.userSubscription;
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return this.getDefaultSubscription();
    }
  }

  private getDefaultSubscription(): UserSubscriptionData {
    return {
      tier: 'freemium',
      status: 'active',
      usage: {
        skillsThisMonth: 0,
        tutorialsThisMonth: 0,
        gameTestingThisMonth: 0,
        challengesThisWeek: 0,
        aiQuestionsToday: 0,
        certificatesThisYear: 0,
        storageUsedGB: 0,
      },
    };
  }

  private mapStripeTierToSubscriptionTier(priceId: string | null): SubscriptionTier {
    if (!priceId) return 'freemium';
    
    const tier = subscriptionTiers.find(t => 
      t.stripeMonthlyPriceId === priceId || t.stripeYearlyPriceId === priceId
    );
    
    return tier?.id || 'freemium';
  }

  async checkFeatureAccess(feature: string): Promise<{ hasAccess: boolean; reason?: string }> {
    try {
    const subscription = await this.getCurrentUserSubscription();
    const hasAccess = canAccessFeature(subscription.tier, feature as any);
    
    if (!hasAccess) {
      const tierName = subscriptionTiers.find(t => t.id === subscription.tier)?.name || 'current';
      return {
        hasAccess: false,
        reason: `This feature requires a higher subscription tier than ${tierName}.`
      };
    }
    
    return { hasAccess: true };
    } catch (error) {
      console.warn('Failed to check feature access, allowing by default', error);
      return { hasAccess: true };
    }
  }

  async checkUsageLimit(limitType: string, currentUsage?: number): Promise<{ withinLimit: boolean; remaining: number; limit: number }> {
    try {
    const subscription = await this.getCurrentUserSubscription();
    const usage = currentUsage ?? subscription.usage[limitType as keyof typeof subscription.usage] ?? 0;
    const withinLimit = isWithinLimits(subscription.tier, limitType as any, usage);
    
    const tierConfig = subscriptionTiers.find(t => t.id === subscription.tier);
    const limit = tierConfig?.limits[limitType as keyof typeof tierConfig.limits] as number ?? 0;
    const remaining = limit === -1 ? -1 : Math.max(0, limit - usage);
    
    return {
      withinLimit,
      remaining,
      limit: limit === -1 ? Infinity : limit
    };
    } catch (error) {
      console.warn('Failed to check usage limit, allowing unlimited usage', error);
      return {
        withinLimit: true,
        remaining: Infinity,
        limit: Infinity
      };
    }
  }

  async incrementUsage(limitType: string, amount: number = 1): Promise<boolean> {
    // In a real app, this would update the database
    // For now, we'll just check if the action is allowed
    const { withinLimit } = await this.checkUsageLimit(limitType);
    return withinLimit;
  }

  getSubscriptionTiers() {
    return subscriptionTiers;
  }

  getCurrentTier(): SubscriptionTier {
    return this.userSubscription?.tier || 'freemium';
  }

  async createTeamSubscription(teamData: Partial<TeamSubscription>): Promise<TeamSubscription> {
    // Mock implementation - in real app, this would call the backend
    const team: TeamSubscription = {
      id: Date.now().toString(),
      name: teamData.name || 'New Team',
      ownerId: teamData.ownerId || '',
      adminIds: teamData.adminIds || [],
      memberIds: teamData.memberIds || [],
      maxMembers: 50,
      subscription: await this.getCurrentUserSubscription(),
      settings: {
        allowMemberInvites: true,
        requireApproval: false,
        defaultRole: 'member',
        features: {
          enableAnalytics: true,
          enableCustomBranding: false,
          enableApiAccess: false,
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.teamSubscription = team;
    return team;
  }

  async getTeamSubscription(teamId: string): Promise<TeamSubscription | null> {
    // Mock implementation
    return this.teamSubscription;
  }

  async inviteTeamMember(teamId: string, email: string, role: 'member' | 'admin' = 'member'): Promise<boolean> {
    // Mock implementation
    return true;
  }

  async removeTeamMember(teamId: string, userId: string): Promise<boolean> {
    // Mock implementation
    return true;
  }

  async updateTeamSettings(teamId: string, settings: Partial<TeamSubscription['settings']>): Promise<boolean> {
    // Mock implementation
    if (this.teamSubscription) {
      this.teamSubscription.settings = { ...this.teamSubscription.settings, ...settings };
      this.teamSubscription.updatedAt = new Date();
    }
    return true;
  }
}

export const subscriptionService = SubscriptionService.getInstance();