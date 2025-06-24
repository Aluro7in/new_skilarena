import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            
            {this.state.error && (
              <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                <p className="text-red-300 text-sm font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl font-semibold transition-all"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;