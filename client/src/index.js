import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);

