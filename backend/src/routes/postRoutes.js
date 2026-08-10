// ============================================================
// postRoutes.js – Post & News Feed API Route Definitions
// ============================================================
// WHY THIS FILE EXISTS:
//   Defines API endpoints for post creation and news feed retrieval.
//   All routes are protected by the JWT authentication middleware (protect).
//
// Routes:
//   POST /api/posts  → Create a new post (Authenticated)
//   GET  /api/posts  → Fetch news feed in reverse chronological order (Authenticated)
// ============================================================

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controllers/postController');

// All post routes require JWT authentication
router.use(protect);

router.route('/')
  .post(createPost)
  .get(getPosts);

module.exports = router;
