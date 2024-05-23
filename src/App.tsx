import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
