import { supabase } from '../services/supabase';

export interface DeploymentStatus {
  status: 'deployed' | 'deploying' | 'failed' | 'unknown';
  lastChecked: Date;
  message: string;
  details?: Record<string, any>;
  error?: string;
}

/**
 * Checks the deployment status of the Supabase project
 * This function verifies if the Supabase connection is properly established
 * and the required tables and functions are accessible.
 */
export async function getDeploymentStatus(): Promise<DeploymentStatus> {
  if (!navigator.onLine) {
    return {
      status: 'unknown',
      lastChecked: new Date(),
      message: 'Cannot check deployment status while offline',
      error: 'Network connection unavailable'
    };
  }

  try {
    // Check if we can connect to Supabase
    const { data: healthCheck, error: healthError } = await supabase.rpc('pg_stat_statements_reset', {});
    
    // This RPC should fail for the anon key (which is good - it means Supabase is running)
    // We expect an error with "permission denied" which indicates the service is up
    if (healthError && healthError.message.includes('permission denied')) {
      // Check for the existence of a table we need (users)
      const { error: tablesError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true });
      
      if (tablesError) {
        // Check if this is an RLS error (expected) vs a "relation does not exist" error
        if (tablesError.message.includes('permission denied')) {
          // This is expected with RLS enabled
          return {
            status: 'deployed',
            lastChecked: new Date(),
            message: 'Supabase is properly deployed and RLS is active',
            details: {
              databaseReady: true,
              rlsEnabled: true
            }
          };
        } else if (tablesError.message.includes('does not exist')) {
          return {
            status: 'failed',
            lastChecked: new Date(),
            message: 'Database schema is not properly deployed',
            error: 'Required tables are missing'
          };
        }
      } else {
        // We successfully queried the table
        return {
          status: 'deployed',
          lastChecked: new Date(),
          message: 'Supabase is properly deployed and accessible',
          details: {
            databaseReady: true
          }
        };
      }
    }
    
    // Check for edge functions
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-webhook`, {
        method: 'OPTIONS'
      });
      
      // The function exists if we get a response (even if it's a CORS error)
      if (response.status === 204 || response.status === 200) {
        return {
          status: 'deployed',
          lastChecked: new Date(),
          message: 'All Supabase services are properly deployed',
          details: {
            databaseReady: true,
            edgeFunctionsReady: true
          }
        };
      }
    } catch (functionError) {
      // Edge function might not be deployed yet
      console.warn('Edge function check failed:', functionError);
    }
    
    return {
      status: 'unknown',
      lastChecked: new Date(),
      message: 'Deployment status could not be determined',
      error: 'Unexpected response from Supabase'
    };
    
  } catch (error: any) {
    return {
      status: 'failed',
      lastChecked: new Date(),
      message: 'Failed to connect to Supabase',
      error: error.message || 'Unknown error'
    };
  }
}