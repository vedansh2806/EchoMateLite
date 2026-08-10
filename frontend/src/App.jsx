// ============================================================
// App.jsx – Main Application Component & Navigation View Manager
// ============================================================

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import './App.css';

function MainLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  // Automatically update active tab based on auth state
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && (activeTab === 'feed' || activeTab === 'profile' || activeTab === 'create')) {
        setActiveTab('login');
      } else if (isAuthenticated && (activeTab === 'login' || activeTab === 'register')) {
        setActiveTab('feed');
      }
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="state-card" style={{ marginTop: '5rem' }}>
          <div className="spinner">⚡</div>
          <h3>Initializing EchoMateLite...</h3>
          <p>Verifying cloud session token</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {/* Unauthenticated Pages */}
        {!isAuthenticated && activeTab === 'login' && (
          <LoginPage setActiveTab={setActiveTab} />
        )}
        {!isAuthenticated && activeTab === 'register' && (
          <RegisterPage setActiveTab={setActiveTab} />
        )}

        {/* Authenticated Pages */}
        {isAuthenticated && activeTab === 'feed' && (
          <FeedPage setActiveTab={setActiveTab} />
        )}
        {isAuthenticated && activeTab === 'profile' && <ProfilePage />}
        {isAuthenticated && activeTab === 'create' && (
          <CreatePostPage setActiveTab={setActiveTab} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          EchoMateLite &copy; {new Date().getFullYear()} | MCA Capstone Project | Deepak Jain (USN: 241VMTR01377) | Jain Online University
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
