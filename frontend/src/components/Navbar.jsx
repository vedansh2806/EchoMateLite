// ============================================================
// Navbar.jsx – Top Navigation Header Component
// ============================================================

import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div className="navbar-brand" onClick={() => setActiveTab(isAuthenticated ? 'feed' : 'login')}>
          <div className="brand-icon">⚡</div>
          <div className="brand-text">
            <span className="brand-title">EchoMateLite</span>
            <span className="brand-badge">MCA Capstone</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          {isAuthenticated ? (
            <>
              <button
                className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                onClick={() => setActiveTab('feed')}
              >
                📰 News Feed
              </button>
              <button
                className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => setActiveTab('create')}
              >
                ➕ Create Post
              </button>
              <button
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Profile
              </button>
              <div className="user-badge">
                <span className="user-avatar-small">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </span>
                <span className="user-name">{user?.name}</span>
              </div>
              <button className="nav-btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className="nav-btn-primary"
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
