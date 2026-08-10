// ============================================================
// Post.js – Mongoose Schema for Social Media Posts
// ============================================================
// WHY THIS FILE EXISTS:
//   Defines the data structure for user posts stored in MongoDB.
//   Each post is linked to a User via an ObjectId reference.
// ============================================================

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please add text content for your post'],
    trim: true,
    maxlength: [500, 'Post content cannot exceed 500 characters'],
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
