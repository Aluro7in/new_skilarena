import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, ExternalLink, Database, Wifi, Globe, Shield, Server, Key, Loader, Cloud } from 'lucide-react';
import { runConnectionDiagnostic } from '../utils/connectionDiagnostic';
import { supabaseService, isUsingDemoMode } from '../services/supabase';
import { getDeploymentStatus } from '../utils/deploymentStatus';

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

const ConnectionTroubleshooter = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [deployStatus, setDeployStatus] = useState<{
    status: string;
    message: string;
    lastChecked: Date;
  } | null>(null);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  const [isCheckingDeployment, setIsCheckingDeployment] = useState(false);

  useEffect(() => {
    runDiagnostic();
  }, []);

  // Separate function to check deployment status
  const checkDeploymentStatus = async () => {
    setIsCheckingDeployment(true);
    try {
      const status = await getDeploymentStatus();
      setDeployStatus({
        status: status.status,
        message: status.message,
        lastChecked: new Date()
      });
    } catch (error) {
      console.error("Failed to check deployment status:", error);
    } finally {
      setIsCheckingDeployment(false);
  const runDiagnostic = async () => {
    setIsRunning(true);
    try {
      const diagnosticReport = await runConnectionDiagnostic(supabaseService);
      setReport(diagnosticReport);

      // Attempt to get team data from subscription service
      const subscription = await subscriptionService.getCurrentUserSubscription();
      
      if (subscription && subscription.tier === 'teams') {
        // If we have a team subscription, fetch team data
        const teamData = await subscriptionService.getTeamSubscription(subscription.teamId || '');
        setTeam(teamData);
      } else {
        setTeam(null);
      }
    } catch (error) {
      console.error('Failed to run diagnostic:', error);
      setTeam(null);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleDetails = (key: string) => {
    setShowDetails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusIcon = (status: 'success' | 'error' | 'warning') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'supabaseUrl':
        return <Globe className="h-5 w-5 text-blue-400" />;
      case 'supabaseKey':
        return <Key className="h-5 w-5 text-purple-400" />;
      case 'networkConnectivity':
        return <Wifi className="h-5 w-5 text-green-400" />;
      case 'corsConfiguration':
        return <Shield className="h-5 w-5 text-yellow-400" />;
      case 'apiEndpointAccess':
        return <Server className="h-5 w-5 text-cyan-400" />;
      case 'databaseConnection':
        return <Database className="h-5 w-5 text-pink-400" />;
      default:
        return null;
    }
  };

  // Special function for deployment status icon
  const getDeploymentStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <Cloud className="h-5 w-5 text-green-400" />;
      case 'deploying':
        return <Loader className="h-5 w-5 text-blue-400 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        return <Cloud className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: 'success' | 'error' | 'warning') => {
    switch (status) {
      case 'success':
        return 'bg-green-600/20 border-green-500/30';
      case 'warning':
        return 'bg-yellow-600/20 border-yellow-500/30';
      case 'error':
        return 'bg-red-600/20 border-red-500/30';
      default:
        return 'bg-gray-600/20 border-gray-500/30';
    }
  };

  const getCategoryTitle = (category: string): string => {
    switch (category) {
      case 'supabaseUrl':
        return 'Supabase URL';
      case 'supabaseKey':
        return 'Supabase API Key';
      case 'networkConnectivity':
        return 'Network Connectivity';
      case 'corsConfiguration':
        return 'CORS Configuration';
      case 'apiEndpointAccess':
        return 'API Endpoints';
      case 'databaseConnection':
        return 'Database Connection';
      default:
        return category;
    }
  };

  if (isUsingDemoMode) {
    return (
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Demo Mode Active</h2>
          <p className="text-gray-300 mb-4">
            The application is running in demo mode. Supabase connection troubleshooting is not available.
          </p>
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 mb-6 text-left max-w-lg mx-auto">
            <p className="text-yellow-300 text-sm mb-2">
              <strong>Why am I seeing this?</strong>
            </p>
            <ul className="text-yellow-200 text-sm space-y-1 list-disc pl-5">
              <li>Supabase credentials are missing or using placeholder values</li>
              <li>The app is falling back to demo mode for demonstration purposes</li>
            </ul>

            {/* Deployment Status - New Section */}
            {report.deploymentStatus && (
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  {getDeploymentStatusIcon(report.deploymentStatus.status)}
                  <div className="text-sm text-gray-300">
                    Deployment Status: <span className={report.deploymentStatus.status === 'deployed' ? 'text-green-400' : report.deploymentStatus.status === 'deploying' ? 'text-blue-400' : 'text-yellow-400'}>
                      {report.deploymentStatus.status.charAt(0).toUpperCase() + report.deploymentStatus.status.slice(1)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1 ml-7">{report.deploymentStatus.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-white mb-4">To connect to Supabase:</h3>
          <ol className="text-gray-300 text-left max-w-lg mx-auto space-y-3 mb-6 list-decimal pl-5">
            <li>Create a <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">Supabase account</a> if you don't have one</li>
            <li>Create a new Supabase project</li>
            <li>Create a <code className="bg-gray-800 px-2 py-1 rounded text-xs">.env</code> file based on <code className="bg-gray-800 px-2 py-1 rounded text-xs">.env.example</code></li>
            <li>Add your Supabase URL and anon key to the <code className="bg-gray-800 px-2 py-1 rounded text-xs">.env</code> file</li>
            <li>Restart the development server</li>
          </ol>

          <a 
            href="https://supabase.com/docs/guides/getting-started/quickstarts/reactjs" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <span>Supabase React Quickstart Guide</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
    deploymentStatus?: {
      status: string;
      message: string;
      lastChecked: string;
    };
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Connection Troubleshooter</h1>
          <p className="text-gray-400 mt-1">Diagnose and fix connection issues with Supabase</p>
        </div>
        <button
          onClick={runDiagnostic}
          disabled={isRunning}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running...' : 'Run Diagnostic'}</span>
        </button>
      </div>

      {isRunning ? (
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Running diagnostics...</p>
            <p className="text-gray-400 text-sm mt-2">Checking connection, configuration, and deployment status...</p>
          </div>
        </div>
      ) : report ? (
        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`bg-black/20 backdrop-blur-xl border rounded-2xl p-6 ${
            report.connectionStatus === 'connected' ? 'border-green-500/30' :
            report.connectionStatus === 'partial' ? 'border-yellow-500/30' :
            'border-red-500/30'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                report.connectionStatus === 'connected' ? 'bg-green-600/20' :
                report.connectionStatus === 'partial' ? 'bg-yellow-600/20' :
                'bg-red-600/20'
              }`}>
                {report.connectionStatus === 'connected' ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : report.connectionStatus === 'partial' ? (
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {report.connectionStatus === 'connected' ? 'Connection Successful' :
                   report.connectionStatus === 'partial' ? 'Partial Connection' :
                   'Connection Failed'}
                </h2>
                <p className="text-gray-300">{report.overallStatus}</p>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Diagnostic Results</h2>
            <div className="space-y-4">
              {(['supabaseUrl', 'supabaseKey', 'networkConnectivity', 'corsConfiguration', 'apiEndpointAccess', 'databaseConnection'] as const).map((key) => {
                const result = report[key];
                return (
                  <div 
                    key={key} 
                    className={`border rounded-xl p-4 cursor-pointer ${getStatusColor(result.status)}`}
                    onClick={() => toggleDetails(key)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-black/30 rounded-full p-2">
                          {getCategoryIcon(key)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{getCategoryTitle(key)}</h3>
                          <p className="text-gray-300 text-sm">{result.message}</p>
                        </div>
                      </div>
                      <div>
                        {getStatusIcon(result.status)}
                      </div>
                    </div>

                    {showDetails[key] && (result.details || result.suggestion) && (
                      <div className="mt-4 pl-10 border-t border-white/10 pt-4">
                        {result.details && (
                          <div className="mb-2">
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Details</h4>
                            <p className="text-white text-sm">{result.details}</p>
                          </div>
                        )}
                        {result.suggestion && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Suggestion</h4>
                            <p className="text-purple-300 text-sm">{result.suggestion}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recommendations</h2>
            {report.recommendations.length > 0 ? (
              <ul className="space-y-2">
                {report.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No recommendations needed. Your connection is working properly.</p>
            )}
          </div>

          {/* Quick Fix Guide */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Common Solutions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Key className="h-4 w-4 mr-2 text-purple-400" />
                  Missing or Invalid Credentials
                </h3>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal pl-5">
                  <li>Ensure <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">.env</code> file exists and is properly formatted</li>
                  <li>Copy credentials from Supabase dashboard (Project Settings → API)</li>
                  <li>Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly set</li>
                  <li>Restart the dev server after updating environment variables</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-yellow-400" />
                  CORS Configuration
                </h3>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal pl-5">
                  <li>Go to Supabase Dashboard → Project Settings → API → CORS</li>
                  <li>Add your application's URL to the allowed origins</li>
                  <li>For local development, add <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">http://localhost:5173</code> or your specific port</li>
                  <li>Enable <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">*</code> temporarily for testing (not recommended for production)</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2 text-pink-400" />
                  Database Connection
                </h3>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal pl-5">
                  <li>Verify database is active in Supabase dashboard</li>
                  <li>Check if your tables exist and have the correct schema</li>
                  <li>Ensure your project hasn't hit usage limits or quotas</li>
                  <li>Review Row Level Security (RLS) policies for access control</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center">
                  <Wifi className="h-4 w-4 mr-2 text-green-400" />
                  Network Issues
                </h3>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal pl-5">
                  <li>Check your internet connection and firewall settings</li>
                  <li>Try accessing Supabase from a different network</li>
                  <li>Disable VPN if you're using one, as it might block connections</li>
                  <li>Check if your organization's network blocks certain API requests</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Connection Details */}
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Environment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">Supabase URL:</p>
                <p className="text-white font-mono overflow-hidden text-ellipsis">
                  {import.meta.env.VITE_SUPABASE_URL?.slice(0, 8) === 'https://' 
                    ? `https://${import.meta.env.VITE_SUPABASE_URL?.slice(8, 12)}...` 
                    : 'Not configured'}
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">API Key Status:</p>
                <p className="text-white">
                  {import.meta.env.VITE_SUPABASE_ANON_KEY?.length > 0 
                    ? `Configured (${import.meta.env.VITE_SUPABASE_ANON_KEY?.length} characters)` 
                    : 'Not configured'}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">Browser:</p>
                <p className="text-white">{navigator.userAgent}</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">Network Status:</p>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${navigator.onLine ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <p className="text-white">{navigator.onLine ? 'Online' : 'Offline'}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">App Origin:</p>
                <p className="text-white font-mono">{window.location.origin}</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400">Report Time:</p>
                <p className="text-white">{new Date(report.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
            <Database className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Connection Status Unknown</h3>
          <p className="text-gray-300 mb-6">Run the diagnostic to check your Supabase connection</p>
          
          <button
            onClick={runDiagnostic}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 mb-4"
          >
            Run Full Diagnostic
          </button>
          
          <button
            onClick={checkDeploymentStatus}
            disabled={isCheckingDeployment}
            className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-black/50 transition-all disabled:opacity-50"
          >
            {isCheckingDeployment ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Checking deployment...</span>
              </>
            ) : (
              <>
                <Cloud className="h-4 w-4" />
                <span>Check Deployment Status Only</span>
              </>
            )}
          </button>
          
          {deployStatus && !isCheckingDeployment && (
            <div className={`mt-6 p-4 rounded-xl ${
              deployStatus.status === 'deployed' ? 'bg-green-600/20 border border-green-500/30' :
              deployStatus.status === 'deploying' ? 'bg-blue-600/20 border border-blue-500/30' :
              'bg-yellow-600/20 border border-yellow-500/30'
            }`}>
              <div className="flex items-center space-x-2">
                {getDeploymentStatusIcon(deployStatus.status)}
                <span className="text-white font-medium">
                  {deployStatus.status === 'deployed' ? 'Deployment Status: Active' :
                   deployStatus.status === 'deploying' ? 'Deployment Status: In Progress' :
                   'Deployment Status: Attention Needed'}
                </span>
              </div>
              <p className="text-gray-300 mt-2">{deployStatus.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                Last checked: {deployStatus.lastChecked.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Help Resources */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://supabase.com/docs" 
            target="_blank" 
            rel="noreferrer"
            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <h3 className="font-semibold text-white mb-2">Supabase Documentation</h3>
            <p className="text-gray-400 text-sm mb-2">Official guides, references, and tutorials</p>
            <div className="flex items-center text-purple-400 text-sm">
              <span>Visit docs</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </a>

          <a 
            href="https://supabase.com/dashboard/project/_/settings/api" 
            target="_blank" 
            rel="noreferrer"
            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <h3 className="font-semibold text-white mb-2">API Settings Dashboard</h3>
            <p className="text-gray-400 text-sm mb-2">Configure API settings, CORS, and authentication</p>
            <div className="flex items-center text-purple-400 text-sm">
              <span>Open dashboard</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </a>

          <a 
            href="https://github.com/supabase/supabase/discussions" 
            target="_blank" 
            rel="noreferrer"
            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <h3 className="font-semibold text-white mb-2">Community Forum</h3>
            <p className="text-gray-400 text-sm mb-2">Get help from the Supabase community</p>
            <div className="flex items-center text-purple-400 text-sm">
              <span>Join discussions</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </a>

          <a 
            href="https://discord.supabase.com" 
            target="_blank" 
            rel="noreferrer"
            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <h3 className="font-semibold text-white mb-2">Supabase Discord</h3>
            <p className="text-gray-400 text-sm mb-2">Real-time help and community support</p>
            <div className="flex items-center text-purple-400 text-sm">
              <span>Join Discord</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTroubleshooter;