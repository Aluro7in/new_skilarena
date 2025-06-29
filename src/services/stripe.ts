import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';
import { stripeProducts, type StripeProduct } from '../stripe-config';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
// Force demo mode
const isStripeConfigured = false;

// Only attempt to load Stripe if we have a valid key
const stripePromise = isStripeConfigured 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null);

export class StripeService {
  private stripe: any = null;
  private isConfigured: boolean = isStripeConfigured;

  async initialize() {
    try {
      this.stripe = await stripePromise;
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      this.isConfigured = false;
    }
    return this.stripe;
  }

  async createCheckoutSession(priceId: string, mode: 'subscription' | 'payment' = 'subscription') {
    try {
      // Check if Stripe is properly configured
      if (!this.isConfigured) {
        throw new Error('Stripe is not configured. Please add a valid Stripe publishable key to your environment variables.');
      }

      // Check if we're online
      if (!navigator.onLine) {
        throw new Error('You appear to be offline. Please check your internet connection and try again.');
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.access_token) {
        throw new Error('User not authenticated');
      }

      const product = stripeProducts.find(p => p.priceId === priceId);
      if (!product) {
        throw new Error('Product not found');
      }

      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan_id=${product.id}`;
      const cancelUrl = `${baseUrl}/student-upgrade`;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode: mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  async redirectToCheckout(sessionId: string) {
    // Check if Stripe is properly configured
    if (!this.isConfigured) {
      throw new Error('Stripe is not configured. Please add a valid Stripe publishable key to your environment variables.');
    }
    
    if (!this.stripe) {
      await this.initialize();
    }

    const { error } = await this.stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  }

  async purchaseProduct(priceId: string, mode: 'subscription' | 'payment' = 'subscription') {
    try {
      // Check if Stripe is properly configured
      if (!this.isConfigured) {
        console.warn('Stripe is not configured. Running in demo mode.');
        return;
      }
      
      const session = await this.createCheckoutSession(priceId, mode);
      await this.redirectToCheckout(session.sessionId);
    } catch (error) {
      console.error('Error purchasing product:', error);
      throw error;
    }
  }

  getProducts(): StripeProduct[] {
    return stripeProducts;
  }

  getProductByPriceId(priceId: string): StripeProduct | undefined {
    return stripeProducts.find(product => product.priceId === priceId);
  }

  getProductById(id: string): StripeProduct | undefined {
    return stripeProducts.find(product => product.id === id);
  }
  
  isStripeConfigured(): boolean {
    return this.isConfigured;
  }
}

export const stripeService = new StripeService();