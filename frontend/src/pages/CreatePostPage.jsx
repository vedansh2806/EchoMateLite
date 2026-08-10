// ============================================================
// CreatePostPage.jsx – Post Creation Form Component
// ============================================================

import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreatePostPage({ setActiveTab, onPostCreated }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text content for your post.');
      return;
    }

    if (text.length > 500) {
      setError('Post content cannot exceed 500 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.createPost({ text: text.trim(), image: image.trim() });
      if (res.success) {
        setText('');
        setImage('');
        if (onPostCreated) onPostCreated();
        setActiveTab('feed');
      } else {
        setError(res.message || 'Failed to publish post.');
      }
    } catch (err) {
      setError(err.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="card-header-styled">
          <h3>✍️ Compose New Post</h3>
          <p>Share updates with the EchoMateLite platform community</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="author-preview">
            <span className="avatar-small">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </span>
            <span className="author-title">Posting as <strong>{user?.name}</strong></span>
          </div>

          <div className="form-group">
            <textarea
              className="post-textarea"
              placeholder="What's on your mind today?"
              rows="4"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
              maxLength={500}
              required
            />
            <div className="char-counter">{text.length} / 500 characters</div>
          </div>

          <div className="form-group">
            <label htmlFor="postImage">Optional Image URL</label>
            <input
              type="url"
              id="postImage"
              placeholder="https://example.com/photo.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={loading}
            />
          </div>

          {image && (
            <div className="image-preview-box">
              <label>Image Preview:</label>
              <img src={image} alt="Preview" onError={(e) => (e.target.style.display = 'none')} />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Publishing...' : '🚀 Publish Post'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setActiveTab('feed')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
