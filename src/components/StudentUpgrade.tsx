import React, { useState, useEffect } from 'react';
import { Crown, Zap, Star, Trophy, Target, Users, BookOpen, Award, CheckCircle, X, Sparkles, TrendingUp, Shield, Headphones, CreditCard, Loader, ArrowRight, Globe, BarChart3 } from 'lucide-react';
import { stripeService } from '../services/stripe';
import { subscriptionTiers } from '../config/subscriptionTiers';
import { subscriptionService } from '../services/subscriptionService';

const StudentUpgrade: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<string>('freemium');

  useEffect(() => {
    loadCurrentSubscription();
  }, []);

  const loadCurrentSubscription = async () => {
    try {
      const subscription = await subscriptionService.getCurrentUserSubscription();
      setCurrentTier(subscription.tier);
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
  };

  const handleSubscription = async (tier: any) => {
    setLoading(tier.id);
    setError(null);
    
    // Check for network connectivity
    if (!navigator.onLine) {
      setError('You appear to be offline. Please check your internet connection and try again.');
      setLoading(null);
      return;
    }

    try {
      const priceId = billingPeriod === 'yearly' ? tier.stripeYearlyPriceId : tier.stripeMonthlyPriceId;
      if (priceId) {
        await stripeService.purchaseProduct(priceId, 'subscription');
      }
    } catch (err: any) {
      // Handle different types of errors with specific messages
      if (!navigator.onLine || err.message?.includes('offline')) {
        setError('You appear to be offline. Please check your internet connection and try again.');
      } 
      else if (err.message?.includes('not configured') || err.message?.includes('Stripe')) {
        setError('Payment system is not properly configured. Please try again later or contact support.');
      } 
      else if (err.message?.includes('fetch') || err.message?.includes('network')) {
        setError('Network error. Unable to connect to payment service. Please check your connection and try again.');
      } 
      else {
        setError(err.message || 'Failed to start checkout process');
      }
      
      console.error('Subscription error:', err);
    } finally {
      setLoading(null);
    }
  };

  const getFeatureIcon = (feature: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      basicSkills: BookOpen,
      premiumSkills: Star,
      expertSkills: Crown,
      premiumGameTesting: Target,
      professionalCertificates: Award,
      teamWorkspaces: Users,
      prioritySupport: Headphones,
      advancedAnalytics: BarChart3,
      unlimitedAI: Zap,
      customBranding: Sparkles,
      apiIntegration: Globe,
    };
    return icons[feature] || CheckCircle;
  };

  const achievements = [
    { icon: Trophy, title: 'Industry Recognition', description: 'Earn certificates recognized by top studios' },
    { icon: Star, title: 'Premium Opportunities', description: 'Access exclusive game testing projects' },
    { icon: Users, title: 'Team Collaboration', description: 'Build and manage learning teams' },
    { icon: TrendingUp, title: 'Career Growth', description: 'Fast-track your path to success' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'QA Lead at Ubisoft',
      avatar: '👩‍💻',
      quote: 'SkillArena Premium helped me transition from student to QA lead in just 8 months. The exclusive studio connections were game-changing!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Senior Game Tester',
      avatar: '👨‍🎮',
      quote: 'The team features in our educational plan transformed how we teach game development. Students are 3x more engaged!'
    },
    {
      name: 'Emily Davis',
      role: 'VR Testing Specialist',
      avatar: '👩‍🚀',
      quote: 'Premium tier gave me access to cutting-edge VR projects and mentorship that accelerated my career beyond expectations.'
    }
  ];

  const comparisonFeatures = [
    { name: 'Basic Skills Access', freemium: '3/month', premium: true, teams: true },
    { name: 'Premium Skills', freemium: false, premium: true, teams: true },
    { name: 'Expert-Level Content', freemium: false, premium: true, teams: true },
    { name: 'Interactive Tutorials', freemium: '2/month', premium: true, teams: true },
    { name: 'Premium Tutorials', freemium: false, premium: true, teams: true },
    { name: 'Live Webinars', freemium: false, premium: true, teams: true },
    { name: 'Basic Game Testing', freemium: '1/month', premium: true, teams: true },
    { name: 'Premium Testing Projects', freemium: false, premium: true, teams: true },
    { name: 'Exclusive Studio Access', freemium: false, premium: true, teams: true },
    { name: 'Higher Testing Payouts', freemium: false, premium: true, teams: true },
    { name: 'AI Assistant', freemium: '5 questions/day', premium: true, teams: true },
    { name: 'Unlimited AI Access', freemium: false, premium: true, teams: true },
    { name: 'Basic Certificates', freemium: '1/year', premium: true, teams: true },
    { name: 'Professional Certificates', freemium: false, premium: true, teams: true },
    { name: 'Industry Recognition', freemium: false, premium: true, teams: true },
    { name: 'Career Coaching', freemium: false, premium: true, teams: true },
    { name: 'Job Placement Assistance', freemium: false, premium: false, teams: true },
    { name: 'Team Workspaces', freemium: false, premium: false, teams: true },
    { name: 'Admin Dashboard', freemium: false, premium: false, teams: true },
    { name: 'Team Analytics', freemium: false, premium: false, teams: true },
    { name: 'User Management', freemium: false, premium: false, teams: true },
    { name: 'Custom Branding', freemium: false, premium: false, teams: true },
    { name: 'API Integration', freemium: false, premium: false, teams: true },
    { name: 'Community Support', freemium: true, premium: true, teams: true },
    { name: 'Email Support', freemium: false, premium: true, teams: true },
    { name: 'Priority Support', freemium: false, premium: true, teams: true },
    { name: 'Dedicated Account Manager', freemium: false, premium: false, teams: true },
    { name: 'Custom Onboarding', freemium: false, premium: false, teams: true },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-6">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <span className="text-purple-300 font-semibold">Transform Your Future</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Choose Your Learning Journey
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          From freemium exploration to enterprise-grade team solutions, find the perfect plan to accelerate your game development career.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-3 rounded-xl transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-3 rounded-xl transition-all relative ${
              billingPeriod === 'yearly'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto bg-red-600/20 border border-red-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2">
            <X className="h-5 w-5 text-red-400" />
            <span className="text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {subscriptionTiers.map((tier) => {
          const Icon = tier.icon === 'Crown' ? Crown : tier.icon === 'Users' ? Users : BookOpen;
          const isLoading = loading === tier.id;
          const isCurrentTier = tier.id === currentTier;
          const price = billingPeriod === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
          const originalPrice = billingPeriod === 'yearly' ? tier.monthlyPrice * 12 : tier.monthlyPrice;
          
          return (
            <div
              key={tier.id}
              className={`relative bg-black/20 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                tier.popular ? 'ring-2 ring-purple-500/50 hover:shadow-purple-500/30 border-purple-500/30' : 'border-white/10 hover:shadow-white/10'
              } ${selectedPlan === tier.id ? 'ring-2 ring-purple-500' : ''} ${isCurrentTier ? 'ring-2 ring-green-500/50' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    {tier.badge}
                  </div>
                </div>
              )}

              {isCurrentTier && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Current Plan</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.color} mb-4 shadow-2xl`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {price > 0 && billingPeriod === 'yearly' && (
                    <span className="text-gray-400 line-through text-lg">${originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-white">
                    ${price}
                    {price > 0 && <span className="text-lg text-gray-400">/{billingPeriod === 'yearly' ? 'year' : 'month'}</span>}
                  </span>
                </div>
                {price > 0 && billingPeriod === 'yearly' && (
                  <div className="text-green-400 text-sm font-semibold">
                    Save ${originalPrice - price} per year
                  </div>
                )}
                <p className="text-gray-400 text-sm mt-2">{tier.description}</p>
              </div>

              {/* Key Features */}
              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-white text-sm">Key Features:</h4>
                {[
                  tier.features.premiumSkills && 'Premium Skills & Tutorials',
                  tier.features.premiumGameTesting && 'Premium Game Testing',
                  tier.features.professionalCertificates && 'Professional Certificates',
                  tier.features.unlimitedAI && 'Unlimited AI Assistant',
                  tier.features.teamWorkspaces && 'Team Collaboration',
                  tier.features.prioritySupport && 'Priority Support',
                  tier.features.advancedReporting && 'Advanced Analytics',
                  tier.features.customBranding && 'Custom Branding',
                ].filter(Boolean).slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Usage Limits */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-white text-sm mb-3">Usage Limits:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">Skills:</div>
                  <div className="text-white font-semibold">
                    {tier.limits.skillsPerMonth === -1 ? 'Unlimited' : `${tier.limits.skillsPerMonth}/month`}
                  </div>
                  <div className="text-gray-400">AI Questions:</div>
                  <div className="text-white font-semibold">
                    {tier.limits.aiQuestionsPerDay === -1 ? 'Unlimited' : `${tier.limits.aiQuestionsPerDay}/day`}
                  </div>
                  <div className="text-gray-400">Storage:</div>
                  <div className="text-white font-semibold">{tier.limits.storageGB} GB</div>
                  {tier.limits.teamMembers && (
                    <>
                      <div className="text-gray-400">Team Size:</div>
                      <div className="text-white font-semibold">{tier.limits.teamMembers} members</div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleSubscription(tier)}
                disabled={isLoading || isCurrentTier || (tier.monthlyPrice === 0)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 ${
                  isCurrentTier
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : tier.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/50'
                    : tier.monthlyPrice === 0
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-black/50'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isCurrentTier ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Current Plan</span>
                  </>
                ) : tier.monthlyPrice === 0 ? (
                  <span>Free Forever</span>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  {tier.monthlyPrice === 0 ? 'No credit card required' : 'Secure payment powered by Stripe'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Feature Comparison */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Complete Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 text-gray-400 font-medium">Features</th>
                <th className="text-center py-4 text-white font-medium">Freemium</th>
                <th className="text-center py-4 text-purple-400 font-medium">Premium Individual</th>
                <th className="text-center py-4 text-emerald-400 font-medium">Teams & Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {comparisonFeatures.map((feature, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-gray-300">{feature.name}</td>
                  <td className="text-center py-3">
                    {typeof feature.freemium === 'boolean' ? (
                      feature.freemium ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400">{feature.freemium}</span>
                    )}
                  </td>
                  <td className="text-center py-3">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400">{feature.premium}</span>
                    )}
                  </td>
                  <td className="text-center py-3">
                    {typeof feature.teams === 'boolean' ? (
                      feature.teams ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-400">{feature.teams}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Security */}
      <div className="bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
        <Shield className="h-12 w-12 mx-auto mb-4 text-green-400" />
        <h3 className="text-xl font-bold text-white mb-4">Enterprise-Grade Security</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Your payment information is processed securely through Stripe with bank-level encryption. We never store your credit card details on our servers.
        </p>
        <div className="flex justify-center items-center space-x-8 text-gray-400">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Stripe Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white text-center mb-8">Unlock Your Potential</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-purple-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Policies */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Subscription Policies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Upgrade & Downgrade</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Upgrade anytime with immediate access to new features</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Downgrade takes effect at the end of current billing period</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Prorated billing for mid-cycle upgrades</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Data and progress preserved during transitions</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Support & Guarantees</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>30-day money-back guarantee on all paid plans</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Cancel anytime with no penalties</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>24/7 support for Premium and Teams subscribers</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Data export available at any time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: 'Can I switch between plans?',
              answer: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your current billing cycle.'
            },
            {
              question: 'What happens to my team if I downgrade?',
              answer: 'Team data is preserved, but access to team features will be restricted. Team members will maintain their individual accounts and progress.'
            },
            {
              question: 'Do you offer educational discounts?',
              answer: 'Yes! We offer special pricing for educational institutions and verified students. Contact our sales team for custom educational pricing.'
            },
            {
              question: 'How does the usage tracking work?',
              answer: 'Usage limits reset monthly (skills, tutorials) or daily (AI questions). We provide clear dashboards to track your usage in real-time.'
            },
            {
              question: 'Can I pause my subscription?',
              answer: 'Premium and Teams subscribers can pause their subscription for up to 3 months through the customer portal without losing benefits.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers. All payments are processed securely through Stripe.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="font-bold text-white mb-2">{faq.question}</h4>
              <p className="text-gray-300 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
        <Crown className="h-16 w-16 mx-auto mb-6 text-purple-400" />
        <h3 className="text-3xl font-bold text-white mb-4">Ready to Level Up Your Career?</h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join over 50,000 learners who have transformed their passion for gaming into successful careers through SkillArena.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => handleSubscription(subscriptionTiers[1])} // Premium plan
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Crown className="h-5 w-5" />
            <span>Start Premium Plan</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="bg-black/30 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black/50 transition-all flex items-center justify-center space-x-2">
            <Headphones className="h-5 w-5" />
            <span>Talk to Sales</span>
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-400">
          Start with our freemium plan • No credit card required • Upgrade anytime
        </div>
      </div>
    </div>
  );
};

export default StudentUpgrade;