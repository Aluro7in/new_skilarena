import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, ExternalLink, Database, Wifi, Globe, Shield, Server, Key, Loader, Cloud } from 'lucide-react';
import { runConnectionDiagnostic } from '../utils/connectionDiagnostic';
import { supabaseService, isUsingDemoMode } from '../services/supabase';

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

const ConnectionTroubleshooter: React.FC = () => {
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    runDiagnostic();
  }, []);

  const runDiagnostic = async () => {
    setIsRunning(true);
    try {
      const diagnosticReport = await runConnectionDiagnostic();
      setReport(diagnosticReport);
      
      // Initialize detail visibility state
      const initialDetailsState: Record<string, boolean> = {};
      Object.keys(diagnosticReport)
        .filter(key => typeof diagnosticReport[key as keyof DiagnosticReport] === 'object')
        .forEach(key => {
          initialDetailsState[key] = false;
        });
      setShowDetails(initialDetailsState);
    } catch (error) {
      console.error('Failed to run diagnostic:', error);
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rest of the component JSX */}
    </div>
  );
};

export default ConnectionTroubleshooter;