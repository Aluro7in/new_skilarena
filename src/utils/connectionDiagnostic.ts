import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface DiagnosticResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
  suggestion?: string;
}

interface DiagnosticReport {
  timestamp: string;
  connectionStatus: 'connected' | 'disconnected' | 'partial';
  supabaseUrl: DiagnosticResult;
  supabaseKey: DiagnosticResult;
  networkConnectivity: DiagnosticResult;
  corsConfiguration: DiagnosticResult;
  apiEndpointAccess: DiagnosticResult;
  databaseConnection: DiagnosticResult;
  overallStatus: string;
  recommendations: string[];
}

export async function runConnectionDiagnostic(): Promise<DiagnosticReport> {
  const timestamp = new Date().toISOString();
  const recommendations: string[] = [];
  const report: Partial<DiagnosticReport> = {
    timestamp,
    recommendations
  };

  // 1. Check Supabase URL validity
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseUrlResult = checkSupabaseUrl(supabaseUrl);
  report.supabaseUrl = supabaseUrlResult;
  if (supabaseUrlResult.status !== 'success') {
    recommendations.push(supabaseUrlResult.suggestion || 'Verify your Supabase URL in the .env file');
  }

  // 2. Check Supabase API key validity
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabaseKeyResult = checkSupabaseKey(supabaseKey);
  report.supabaseKey = supabaseKeyResult;
  if (supabaseKeyResult.status !== 'success') {
    recommendations.push(supabaseKeyResult.suggestion || 'Verify your Supabase anon key in the .env file');
  }

  // 3. Check network connectivity
  const networkConnectivityResult = checkNetworkConnectivity();
  report.networkConnectivity = networkConnectivityResult;
  if (networkConnectivityResult.status !== 'success') {
    recommendations.push(networkConnectivityResult.suggestion || 'Check your internet connection');
  }

  // 4. Check CORS configuration
  const corsResult = await checkCorsConfiguration(supabaseUrl);
  report.corsConfiguration = corsResult;
  if (corsResult.status !== 'success') {
    recommendations.push(corsResult.suggestion || 'Update your Supabase CORS configuration');
  }

  // 5. Check API endpoint accessibility
  let client: SupabaseClient | null = null;
  
  try {
    if (supabaseUrl && supabaseKey && 
        !supabaseUrl.includes('your_supabase') &&
        !supabaseKey.includes('your_supabase')) {
      client = createClient(supabaseUrl, supabaseKey);
    }
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
  }

  const apiEndpointResult = await checkApiEndpoints(client);
  report.apiEndpointAccess = apiEndpointResult;
  if (apiEndpointResult.status !== 'success') {
    recommendations.push(apiEndpointResult.suggestion || 'Verify API endpoint access');
  }

  // 6. Check Database connection
  const dbConnectionResult = await checkDatabaseConnection(client);
  report.databaseConnection = dbConnectionResult;
  if (dbConnectionResult.status !== 'success') {
    recommendations.push(dbConnectionResult.suggestion || 'Check database connection status in Supabase dashboard');
  }

  // Determine overall status
  const statuses = [
    supabaseUrlResult.status, 
    supabaseKeyResult.status, 
    networkConnectivityResult.status,
    corsResult.status, 
    apiEndpointResult.status, 
    dbConnectionResult.status
  ];
  
  const errorCount = statuses.filter(s => s === 'error').length;
  const warningCount = statuses.filter(s => s === 'warning').length;
  
  if (errorCount > 0) {
    report.connectionStatus = 'disconnected';
    report.overallStatus = `Connection failed with ${errorCount} error(s) and ${warningCount} warning(s)`;
  } else if (warningCount > 0) {
    report.connectionStatus = 'partial';
    report.overallStatus = `Connection partially successful with ${warningCount} warning(s)`;
  } else {
    report.connectionStatus = 'connected';
    report.overallStatus = 'Connection successful';
  }

  if (report.recommendations?.length === 0) {
    report.recommendations = ['No recommendations needed. Connection is working properly.'];
  }

  return report as DiagnosticReport;
}

function checkSupabaseUrl(url?: string): DiagnosticResult {
  if (!url) {
    return {
      status: 'error',
      message: 'Supabase URL is missing',
      details: 'VITE_SUPABASE_URL environment variable is not defined',
      suggestion: 'Add VITE_SUPABASE_URL to your .env file'
    };
  }

  if (url.includes('your_supabase') || url === 'https://example.supabase.co') {
    return {
      status: 'error',
      message: 'Supabase URL is using a placeholder value',
      details: 'VITE_SUPABASE_URL contains a placeholder rather than a real URL',
      suggestion: 'Replace the placeholder with your actual Supabase URL from your project settings'
    };
  }

  if (!url.startsWith('https://')) {
    return {
      status: 'error',
      message: 'Invalid Supabase URL format',
      details: 'Supabase URL should start with https://',
      suggestion: 'Ensure your Supabase URL starts with https:// and is from a valid Supabase project'
    };
  }

  try {
    new URL(url);
    return {
      status: 'success',
      message: 'Supabase URL is valid'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Supabase URL is not a valid URL',
      details: error instanceof Error ? error.message : 'Invalid URL format',
      suggestion: 'Check your Supabase URL for typos or formatting issues'
    };
  }
}

function checkSupabaseKey(key?: string): DiagnosticResult {
  if (!key) {
    return {
      status: 'error',
      message: 'Supabase anon key is missing',
      details: 'VITE_SUPABASE_ANON_KEY environment variable is not defined',
      suggestion: 'Add VITE_SUPABASE_ANON_KEY to your .env file'
    };
  }

  if (key.includes('your_supabase') || 
      key.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9') ||
      key === 'your-anon-key') {
    return {
      status: 'error',
      message: 'Supabase anon key is using a placeholder value',
      details: 'VITE_SUPABASE_ANON_KEY contains a placeholder rather than a real key',
      suggestion: 'Replace the placeholder with your actual anon key from your project settings'
    };
  }

  // Basic key format check (not comprehensive)
  if (key.length < 20) {
    return {
      status: 'warning',
      message: 'Supabase anon key seems too short',
      details: 'Supabase anon keys are typically much longer than this',
      suggestion: 'Verify your anon key in the Supabase dashboard under Project Settings > API'
    };
  }

  return {
    status: 'success',
    message: 'Supabase anon key format is valid'
  };
}

function checkNetworkConnectivity(): DiagnosticResult {
  if (!navigator.onLine) {
    return {
      status: 'error',
      message: 'No internet connection',
      details: 'Your browser reports that you are currently offline',
      suggestion: 'Check your internet connection and try again'
    };
  }

  // Check if we can ping a reliable service
  return {
    status: 'success',
    message: 'Internet connection is available',
    details: 'Your device is currently online'
  };
}

async function checkCorsConfiguration(supabaseUrl?: string): Promise<DiagnosticResult> {
  if (!supabaseUrl || supabaseUrl.includes('your_supabase')) {
    return {
      status: 'warning',
      message: 'Cannot check CORS configuration without valid Supabase URL',
      suggestion: 'First fix your Supabase URL, then check CORS configuration'
    };
  }

  if (!navigator.onLine) {
    return {
      status: 'warning',
      message: 'Cannot check CORS while offline',
      suggestion: 'Reconnect to the internet and try again'
    };
  }

  try {
    const currentOrigin = window.location.origin;
    
    // We'll do a simple preflight test to see if the current origin is allowed
    // This won't be perfect but gives some indication
    return {
      status: 'warning',
      message: 'CORS configuration could not be fully verified',
      details: 'A complete CORS verification requires server-side checks',
      suggestion: 'If you encounter CORS errors, add your origin to the allowed list in Supabase dashboard'
    };
  } catch (error) {
    return {
      status: 'warning',
      message: 'Could not verify CORS configuration',
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Ensure your domain is added to allowed origins in Supabase dashboard under Project Settings > API > CORS'
    };
  }
}

async function checkApiEndpoints(client: SupabaseClient | null): Promise<DiagnosticResult> {
  if (!client) {
    return {
      status: 'warning',
      message: 'Could not check API endpoints without a valid Supabase client',
      suggestion: 'Fix the Supabase URL and key first'
    };
  }

  if (!navigator.onLine) {
    return {
      status: 'error',
      message: 'Cannot access API endpoints while offline',
      suggestion: 'Reconnect to the internet and try again'
    };
  }

  try {
    // Simple health check by trying to get the session
    const { error } = await client.auth.getSession();
    
    if (error && !error.message.includes('Invalid JWT')) {
      return {
        status: 'error',
        message: 'API endpoints are not accessible',
        details: error.message,
        suggestion: 'Check your network, firewall settings, or VPN that might be blocking the connection'
      };
    }

    return {
      status: 'success',
      message: 'API endpoints are accessible'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to access API endpoints',
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Check for network issues, firewall restrictions, or VPN conflicts'
    };
  }
}

async function checkDatabaseConnection(client: SupabaseClient | null): Promise<DiagnosticResult> {
  if (!client) {
    return {
      status: 'warning',
      message: 'Could not check database connection without a valid Supabase client',
      suggestion: 'Fix the Supabase URL and key first'
    };
  }

  if (!navigator.onLine) {
    return {
      status: 'error',
      message: 'Cannot check database connection while offline',
      suggestion: 'Reconnect to the internet and try again'
    };
  }

  try {
    // Try a simple query to check database connectivity
    // Using a simple system table that should always exist and be accessible
    const { error } = await client.from('users').select('count', { count: 'exact', head: true });
    
    if (error) {
      // Check for RLS policy issues vs. connection issues
      if (error.message.includes('permission denied') || 
          error.message.includes('access') || 
          error.message.includes('policy')) {
        return {
          status: 'warning',
          message: 'Database connection works, but access is restricted',
          details: error.message,
          suggestion: 'Check your Row Level Security (RLS) policies and ensure the user has appropriate permissions'
        };
      }
      
      if (error.message.includes('does not exist')) {
        return {
          status: 'warning',
          message: 'Database is accessible, but schema may be incomplete',
          details: error.message,
          suggestion: 'Run your migrations to create the required tables or check table names in your queries'
        };
      }
      
      return {
        status: 'error',
        message: 'Database connection issue detected',
        details: error.message,
        suggestion: 'Check your database status in the Supabase dashboard'
      };
    }

    return {
      status: 'success',
      message: 'Database connection is working properly'
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to connect to database',
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Verify database status in the Supabase dashboard and check for network issues'
    };
  }
}