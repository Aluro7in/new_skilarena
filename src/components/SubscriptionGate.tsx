import React, { useState, useEffect } from 'react';
import { Lock, Crown, Users, Zap, ArrowRight, X } from 'lucide-react';
import { subscriptionService } from '../services/subscriptionService';
import { subscriptionTiers } from '../config/subscriptionTiers';
import { stripeService } from '../services/stripe';

interface SubscriptionGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradePrompt?: boolean;
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ 
  feature, 
  children, 
  fallback, 
  showUpgradePrompt = true 
}) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string>('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentTier, setCurrentTier] = useState<string>('freemium');

  useEffect(() => {
    checkAccess();
  }, [feature]);

  const checkAccess = async () => {
    try {
      const result = await subscriptionService.checkFeatureAccess(feature);
      setHasAccess(result.hasAccess);
      setReason(result.reason || '');
      
      const subscription = await subscriptionService.getCurrentUserSubscription();
      setCurrentTier(subscription.tier);
    } catch (error) {
      console.error('Error checking feature access:', error);
      setHasAccess(false);
      setReason('Unable to verify access. Please try again.');
    }
  };

  const handleUpgrade = async (tierPriceId: string) => {
    try {
      await stripeService.purchaseProduct(tierPriceId, 'subscription');
    } catch (error) {
      console.error('Upgrade error:', error);
    }
  };

  if (hasAccess === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgradePrompt) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
        <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Feature Locked</h3>
        <p className="text-gray-400">{reason}</p>
      </div>
    );
  }

  const eligibleTiers = subscriptionTiers.filter(tier => {
    const features = tier.features as any;
    return features[feature] === true;
  });

  const currentTierIndex = subscriptionTiers.findIndex(tier => tier.id === currentTier);
  const nextTiers = eligibleTiers.filter((_, index) => index > currentTierIndex);

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Upgrade Required</h3>
        <p className="text-gray-300 mb-6">{reason}</p>
        
        {nextTiers.length > 0 && (
          <div className="space-y-3">
            {nextTiers.slice(0, 2).map((tier) => (
              <button
                key={tier.id}
                onClick={() => setShowUpgradeModal(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Upgrade to {tier.name}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionTiers.map((tier) => {
                const Icon = tier.icon === 'Crown' ? Crown : tier.icon === 'Users' ? Users : Zap;
                const isCurrentTier = tier.id === currentTier;
                const isEligible = eligibleTiers.some(t => t.id === tier.id);
                
                return (
                  <div
                    key={tier.id}
                    className={`relative bg-black/20 backdrop-blur-xl border rounded-2xl p-6 ${
                      isEligible ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'
                    } ${isCurrentTier ? 'opacity-50' : ''}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                      <div className="text-3xl font-bold text-white mb-1">
                        ${tier.monthlyPrice}
                        {tier.monthlyPrice > 0 && <span className="text-lg text-gray-400">/month</span>}
                      </div>
                      <p className="text-gray-400 text-sm">{tier.description}</p>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm">
                      {[
                        tier.features.premiumSkills && 'Premium Skills',
                        tier.features.premiumGameTesting && 'Premium Game Testing',
                        tier.features.professionalCertificates && 'Professional Certificates',
                        tier.features.prioritySupport && 'Priority Support',
                        tier.features.teamWorkspaces && 'Team Workspaces',
                        tier.features.advancedReporting && 'Advanced Analytics',
                      ].filter(Boolean).slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        if (!isCurrentTier && tier.stripeMonthlyPriceId) {
                          handleUpgrade(tier.stripeMonthlyPriceId);
                        }
                      }}
                      disabled={isCurrentTier || !tier.stripeMonthlyPriceId}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                        isCurrentTier
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : isEligible
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                          : tier.monthlyPrice === 0
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
                      }`}
                    >
                      {isCurrentTier ? 'Current Plan' : tier.monthlyPrice === 0 ? 'Free Forever' : 'Subscribe Now'}
                    </button>

                    {isEligible && (
                      <div className="mt-3 text-center">
                        <span className="text-green-400 text-xs font-semibold">✓ Unlocks this feature</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionGate;