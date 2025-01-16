import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import App from './App';
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from './contexts/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
