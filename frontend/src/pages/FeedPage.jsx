// ============================================================
// FeedPage.jsx – News Feed Display Page
// ============================================================

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';

export default function FeedPage({ setActiveTab }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    try {
      setError('');
      const res = await api.getPosts();
      if (res.success && Array.isArray(res.posts)) {
        setPosts(res.posts);
      } else {
        setError(res.message || 'Failed to load posts.');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to server backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <div className="feed-container">
      {/* Feed Banner / Welcome */}
      <div className="feed-banner">
        <div className="feed-banner-content">
          <h2>Welcome to EchoMateFeed 👋</h2>
          <p>Real-time community posts powered by MERN & AWS Architecture</p>
        </div>
        <div className="feed-banner-actions">
          <button className="btn-primary-action" onClick={() => setActiveTab('create')}>
            ✏️ New Post
          </button>
          <button className="btn-secondary-action" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {/* Quick Post Prompt Widget */}
      <div className="quick-post-widget" onClick={() => setActiveTab('create')}>
        <div className="widget-avatar">
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} />
          ) : (
            user?.name?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <div className="widget-input-placeholder">
          What's happening, {user?.name?.split(' ')[0]}? Click here to post...
        </div>
      </div>

      {/* Feed Content */}
      {loading ? (
        <div className="state-card">
          <div className="spinner">⌛</div>
          <p>Loading news feed from MongoDB Atlas...</p>
        </div>
      ) : error ? (
        <div className="state-card error-card">
          <div className="state-icon">⚠️</div>
          <p>{error}</p>
          <button className="btn-submit" onClick={fetchPosts}>
            Retry Connection
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="state-card empty-card">
          <div className="state-icon">📭</div>
          <h3>No Posts Yet</h3>
          <p>Be the first to share an update on EchoMateLite!</p>
          <button className="btn-submit" onClick={() => setActiveTab('create')}>
            Create First Post
          </button>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post.id || post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
