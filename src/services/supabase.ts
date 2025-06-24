import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw new Error(this.getReadableErrorMessage(error.message));
      }
      
      return data;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        throw new Error(this.getReadableErrorMessage(error.message));
      }

      return data;
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
      // Check if this is a session-related error (expected for unauthenticated users)
      if (this.isSessionError(error.message)) {
        console.debug('No authenticated user session found');
      } else {
        console.error('Get user error:', error);
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