import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { stripeProducts } from '../stripe-config';

interface SuccessPageProps {
  sessionId?: string;
  planId?: string;
  onContinue: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ sessionId, planId, onContinue }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);

  useEffect(() => {
    // Simulate loading purchase details
    setTimeout(() => {
      const product = stripeProducts.find(p => p.id === planId);
      setPurchaseDetails({
        productName: product?.name || 'SkillArena Subscription',
        amount: product?.price || 9.99,
        currency: product?.currency || 'USD',
        mode: product?.mode || 'subscription'
      });
      setIsLoading(false);
    }, 1500);
  }, [planId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="h-4 w-4 text-yellow-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-300">Welcome to SkillArena Premium</p>
        </div>

        {/* Purchase Details */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Purchase Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400">Product</span>
              <span className="text-white font-semibold">{purchaseDetails?.productName}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400">Amount</span>
              <span className="text-white font-semibold">
                ${purchaseDetails?.amount} {purchaseDetails?.currency?.toUpperCase()}
                {purchaseDetails?.mode === 'subscription' && '/month'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400">Payment Method</span>
              <span className="text-white font-semibold">•••• •••• •••• 4242</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 font-semibold flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirmed
              </span>
            </div>
          </div>

          {sessionId && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <p className="text-gray-400 text-sm mb-2">Transaction ID</p>
              <p className="text-white font-mono text-sm break-all">{sessionId}</p>
            </div>
          )}
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">What's Next?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Explore Premium Features</h4>
              <p className="text-gray-300 text-sm">Access exclusive tutorials, advanced challenges, and premium content.</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Download Receipt</h4>
              <p className="text-gray-300 text-sm">Get your purchase receipt for your records and expense reports.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button className="bg-black/30 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black/50 transition-all flex items-center justify-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Download Receipt</span>
          </button>
          
          <button className="bg-black/30 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black/50 transition-all flex items-center justify-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Share Success</span>
          </button>
        </div>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@skillarena.com" className="text-purple-400 hover:text-purple-300 transition-colors">
              support@skillarena.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;