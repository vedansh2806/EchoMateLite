// ============================================================
// PostCard.jsx – Individual Post Display Component
// ============================================================

import React, { useState } from 'react';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const authorName = post.user?.name || 'Anonymous User';
  const authorInitial = authorName.charAt(0).toUpperCase();
  const authorAvatar = post.user?.profilePicture;
  const authorBio = post.user?.bio || post.user?.email || '';

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Just now';

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="post-card">
      {/* Post Header: Author info */}
      <div className="post-header">
        <div className="author-avatar">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} />
          ) : (
            <div className="avatar-fallback">{authorInitial}</div>
          )}
        </div>
        <div className="author-details">
          <h4 className="author-name">{authorName}</h4>
          {authorBio && <p className="author-bio">{authorBio}</p>}
          <span className="post-time">{formattedDate}</span>
        </div>
      </div>

      {/* Post Body: Text content */}
      <div className="post-body">
        <p className="post-text">{post.text}</p>
      </div>

      {/* Optional Post Image */}
      {post.image && (
        <div className="post-media">
          <img src={post.image} alt="Post Attachment" onError={(e) => (e.target.style.display = 'none')} />
        </div>
      )}

      {/* Post Footer: Interactions */}
      <div className="post-footer">
        <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {likeCount > 0 ? `${likeCount} Likes` : 'Like'}
        </button>
        <span className="cloud-badge">☁️ AWS Hosted</span>
      </div>
    </article>
  );
}
