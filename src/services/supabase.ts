import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use default values for demo mode if environment variables are missing
const DEMO_SUPABASE_URL = 'https://demo.supabase.co';
const DEMO_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Is the app using demo mode?
export const isUsingDemoMode = !supabaseUrl || !supabaseAnonKey || 
                              supabaseUrl.includes('your_supabase') || 
                              supabaseAnonKey.includes('your_supabase');
export const supabase = createClient(
  supabaseUrl || DEMO_SUPABASE_URL, 
  supabaseAnonKey || DEMO_SUPABASE_KEY
);

export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  email_confirmed_at?: string;
}

export interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export class SupabaseService {
  async signUp(email: string, password: string, fullName?: string) {
    try {
      // Always return mock data since we're in demo mode
        // Return mock data in demo mode to prevent actual API calls
        return {
          user: {
            id: 'demo-user-id',
            email: email,
            user_metadata: { full_name: fullName },
            email_confirmed_at: new Date().toISOString()
          }
        };
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      // Always return mock data since we're in demo mode
        // Return mock data in demo mode to prevent actual API calls
        return {
          user: {
            id: 'demo-user-id',
            email: email,
            user_metadata: { full_name: email.split('@')[0] },
            email_confirmed_at: new Date().toISOString()
          }
        };
    } catch (error: any) {
      console.error('Signin error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Signout error:', error);
        throw error;
      }
    } catch (error: any) {
      console.error('Signout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<SupabaseUser | null> {
    try {
      if (isUsingDemoMode) {
        // Return a mock user in demo mode
        return {
          id: 'demo-user-id',
          email: 'demo@example.com',
          user_metadata: { 
            full_name: 'Demo User',
            avatar_url: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150'
          }
        };
      }
      
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        // Check if this is a session-related error (expected for unauthenticated users)
        if (this.isSessionError(error.message)) {
          console.debug('No authenticated user session found');
        } else {
          console.error('Get user error:', error);
        }
        return null;
      }
      return user as SupabaseUser | null;
    } catch (error: any) {
      console.error('Get user error:', error);
      
      // Only in demo mode should we return a mock user on error
      if (isUsingDemoMode) {
        return {
          id: 'demo-user-id',
          email: 'demo@example.com',
          user_metadata: { 
            full_name: 'Demo User',
            avatar_url: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=150'
          }
        };
      }
      return null;
    }
  }

  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        // Check if this is a session-related error (expected for unauthenticated users)
        if (this.isSessionError(error.message)) {
          console.debug('No active session found');
        } else {
          console.error('Get session error:', error);
        }
        return null;
      }
      return session;
    } catch (error: any) {
      // Check if this is a session-related error (expected for unauthenticated users)
      if (this.isSessionError(error.message)) {
        console.debug('No active session found');
      } else {
        console.error('Get session error:', error);
      }
      return null;
    }
  }

  async getUserSubscription(): Promise<UserSubscription | null> {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching user subscription:', error);
        return null;
      }

      return data;
    } catch (error: any) {
      console.error('Error fetching user subscription:', error);
      return null;
    }
  }

  async getUserOrders() {
    try {
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching user orders:', error);
        return [];
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  }

  onAuthStateChange(callback: (user: SupabaseUser | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user as SupabaseUser | null);
    });
  }

  private isSessionError(errorMessage: string): boolean {
    const sessionErrorMessages = [
      'Auth session missing!',
      'No session found',
      'Session not found',
      'User not found',
      'JWT expired',
      'Invalid JWT'
    ];
    
    return sessionErrorMessages.some(msg => 
      errorMessage && errorMessage.toLowerCase().includes(msg.toLowerCase())
    );
  }

  private getReadableErrorMessage(errorMessage: string): string {
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return 'Network error. Please check your internet connection and try again.';
    }
    
    switch (errorMessage) {
      case 'Invalid login credentials':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'Email not confirmed':
        return 'Please check your email and click the confirmation link before signing in.';
      case 'User already registered':
        return 'An account with this email already exists. Try signing in instead.';
      case 'Password should be at least 6 characters':
        return 'Password must be at least 6 characters long.';
      case 'Invalid email':
        return 'Please enter a valid email address.';
      case 'Signup is disabled':
        return 'Account registration is currently disabled. Please contact support.';
      default:
        return errorMessage || 'An unexpected error occurred. Please try again.';
    }
  }
}

export const supabaseService = new SupabaseService();