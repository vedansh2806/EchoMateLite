// ============================================================
// RegisterPage.jsx – User Sign Up Page Component
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ setActiveTab }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profilePicture: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please provide required fields: Name, Email, and Password.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await register(formData);
      if (res.success) {
        setActiveTab('feed');
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🚀</div>
          <h2>Create Account</h2>
          <p>Join EchoMateLite social media platform</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Deepak Jain"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. deepak@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (min 6 chars) *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Short Bio (Optional)</label>
            <input
              type="text"
              id="bio"
              name="bio"
              placeholder="MCA Cloud Computing Student..."
              value={formData.bio}
              onChange={handleChange}
              disabled={loading}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture URL (Optional)</label>
            <input
              type="url"
              id="profilePicture"
              name="profilePicture"
              placeholder="https://example.com/avatar.jpg"
              value={formData.profilePicture}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button className="link-btn" onClick={() => setActiveTab('login')}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
