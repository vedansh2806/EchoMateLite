// ============================================================
// AuthContext.jsx – Authentication & User Session Management
// ============================================================
// WHY THIS FILE EXISTS:
//   Provides global authentication state across all React components.
//   Handles JWT persistence in localStorage and auto-login check on startup.
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('echomatelite_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('echomatelite_token') || null);
  const [loading, setLoading] = useState(true);

  // On initial mount, verify token validity by fetching user profile
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.getProfile();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('echomatelite_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const saveSession = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('echomatelite_token', newToken);
    localStorage.setItem('echomatelite_user', JSON.stringify(newUser));
  };

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success && res.token && res.user) {
      saveSession(res.token, res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token && res.user) {
      saveSession(res.token, res.user);
    }
    return res;
  };

  const updateProfile = async (profileData) => {
    const res = await api.updateProfile(profileData);
    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('echomatelite_user', JSON.stringify(res.user));
    }
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('echomatelite_token');
    localStorage.removeItem('echomatelite_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
