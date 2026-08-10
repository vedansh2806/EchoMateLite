// ============================================================
// ProfilePage.jsx – User Profile Management Page
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || '',
  });
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMsg.text) setStatusMsg({ type: '', text: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatusMsg({ type: 'error', text: 'Name cannot be empty.' });
      return;
    }

    setLoading(true);
    try {
      const res = await updateProfile(formData);
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Failed to update profile.' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Server connection error.' });
    } finally {
      setLoading(false);
    }
  };

  const memberDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Banner / Header */}
        <div className="profile-banner">
          <div className="profile-avatar-large">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <div className="avatar-fallback-large">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
        </div>

        <div className="profile-details-body">
          <div className="profile-title-bar">
            <div>
              <h2>{user?.name}</h2>
              <span className="profile-email">✉️ {user?.email}</span>
            </div>
            {!isEditing && (
              <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {statusMsg.text && (
            <div className={`alert alert-${statusMsg.type}`}>{statusMsg.text}</div>
          )}

          {!isEditing ? (
            /* View Mode */
            <div className="profile-info">
              <div className="info-block">
                <label>Biography</label>
                <p className="bio-text">{user?.bio || 'No bio added yet.'}</p>
              </div>

              <div className="info-block">
                <label>Profile Picture URL</label>
                <p className="url-text">{user?.profilePicture || 'Default Avatar'}</p>
              </div>

              <div className="info-meta">
                <span>🗓️ Member Since: {memberDate}</span>
                <span>🔒 JWT Protected Account</span>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio (Max 200 chars)</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={200}
                />
              </div>

              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture Image URL</label>
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

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
