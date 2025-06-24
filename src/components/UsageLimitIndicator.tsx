import React, { useState, useEffect } from 'react';
import { AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { subscriptionService } from '../services/subscriptionService';

interface UsageLimitIndicatorProps {
  limitType: string;
  currentUsage?: number;
  showUpgradePrompt?: boolean;
  className?: string;
}

const UsageLimitIndicator: React.FC<UsageLimitIndicatorProps> = ({
  limitType,
  currentUsage,
  showUpgradePrompt = false,
  className = ''
}) => {
  const [usage, setUsage] = useState<{
    withinLimit: boolean;
    remaining: number;
    limit: number;
    current: number;
  } | null>(null);

  useEffect(() => {
    checkUsage();
  }, [limitType, currentUsage]);

  const checkUsage = async () => {
    try {
      const result = await subscriptionService.checkUsageLimit(limitType, currentUsage);
      const subscription = await subscriptionService.getCurrentUserSubscription();
      const current = currentUsage ?? subscription.usage[limitType as keyof typeof subscription.usage] ?? 0;
      
      setUsage({
        withinLimit: result.withinLimit,
        remaining: result.remaining,
        limit: result.limit,
        current
      });
    } catch (error) {
      console.error('Error checking usage limit:', error);
    }
  };

  if (!usage) {
    return null;
  }

  const percentage = usage.limit === Infinity ? 0 : (usage.current / usage.limit) * 100;
  const isNearLimit = percentage >= 80;
  const isAtLimit = !usage.withinLimit;

  const getLimitTypeLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      skillsThisMonth: 'Skills',
      tutorialsThisMonth: 'Tutorials',
      gameTestingThisMonth: 'Game Tests',
      challengesThisWeek: 'Challenges',
      aiQuestionsToday: 'AI Questions',
      certificatesThisYear: 'Certificates',
      storageUsedGB: 'Storage'
    };
    return labels[type] || type;
  };

  const formatUsage = (value: number, type: string): string => {
    if (type === 'storageUsedGB') {
      return `${value.toFixed(1)} GB`;
    }
    return value.toString();
  };

  if (usage.limit === Infinity) {
    return (
      <div className={`flex items-center space-x-2 text-green-400 text-sm ${className}`}>
        <Zap className="h-4 w-4" />
        <span>Unlimited {getLimitTypeLabel(limitType)}</span>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">
          {getLimitTypeLabel(limitType)} Usage
        </span>
        <span className={`text-sm font-semibold ${
          isAtLimit ? 'text-red-400' : isNearLimit ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {formatUsage(usage.current, limitType)} / {formatUsage(usage.limit, limitType)}
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      {(isAtLimit || isNearLimit) && (
        <div className={`flex items-center space-x-2 text-sm ${
          isAtLimit ? 'text-red-400' : 'text-yellow-400'
        }`}>
          <AlertCircle className="h-4 w-4" />
          <span>
            {isAtLimit 
              ? `You've reached your ${getLimitTypeLabel(limitType).toLowerCase()} limit`
              : `You're approaching your ${getLimitTypeLabel(limitType).toLowerCase()} limit`
            }
          </span>
        </div>
      )}
      
      {showUpgradePrompt && (isAtLimit || isNearLimit) && (
        <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
          <TrendingUp className="h-4 w-4" />
          <span>Upgrade for unlimited access</span>
        </button>
      )}
    </div>
  );
};

export default UsageLimitIndicator;