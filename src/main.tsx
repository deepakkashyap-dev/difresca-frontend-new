import * as Sentry from "@sentry/react";

const sentryAPI = import.meta.env.VITE_SENTRY_KEY || ''
Sentry.init({
  dsn: sentryAPI,
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "difresca.com"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import App from './App';
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from './contexts/authContext';

const FallbackComponent = () => (
  <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
    <h2>Oops! Something went wrong.</h2>
    <p>We're working to fix it. Please try again later.</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <Sentry.ErrorBoundary fallback={<FallbackComponent />} showDialog={true}>
          <App />
        </Sentry.ErrorBoundary>
      </AuthProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
