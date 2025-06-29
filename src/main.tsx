import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Initialize error tracking
const logError = (error: Error, info: string) => {
  console.error(`${info}:`, error);
  
  // If in production, you could send to a monitoring service
  if (import.meta.env.PROD) {
    // Example: send to monitoring service
    // monitoringService.logError(error);
  }
};

// Add a global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  logError(
    event.reason instanceof Error ? event.reason : new Error(String(event.reason)), 
    'Unhandled promise rejection'
  );
  // Prevent the default browser behavior which might be showing an error to the user
  event.preventDefault();
});

// Add global error handler
window.addEventListener('error', function(event) {
  logError(
    event.error || new Error(event.message),
    'Global error'
  );
});

// Check for online status
window.addEventListener('online', function() {
  console.log('Application is back online');
});

window.addEventListener('offline', function() {
  console.warn('Application is offline');
});

// Check if application is running in demo mode
const isDemoMode = 
  import.meta.env.VITE_FORCE_DEMO_MODE === 'true' ||
  (
    (!import.meta.env.VITE_SUPABASE_URL || 
    !import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_URL.includes('your_') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY.includes('your_'))
  );

if (isDemoMode) {
  console.info('Application running in demo mode. Some features may be limited.');
}

// Add network status monitoring
let lastOnlineStatus = navigator.onLine;

function handleNetworkStatusChange() {
  if (navigator.onLine !== lastOnlineStatus) {
    lastOnlineStatus = navigator.onLine;
    if (navigator.onLine) {
      console.info('Application is back online');
    } else {
      console.warn('Application is offline');
    }
  }
}

// Poll connectivity status (some browsers don't reliably fire online/offline events)
setInterval(handleNetworkStatusChange, 5000);

// Initial connectivity check
if (!navigator.onLine) {
  console.warn('Starting application in offline mode');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);