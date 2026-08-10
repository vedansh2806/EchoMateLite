// ============================================================
// postController.js – Post & News Feed Business Logic
// ============================================================
// WHY THIS FILE EXISTS:
//   Contains controller functions for post creation and news feed
//   retrieval in reverse chronological order.
// ============================================================

const Post = require('../models/Post');

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private (JWT required)
 */
exports.createPost = async (req, res, next) => {
  try {
    const { text, image } = req.body;

    // 1. Validation: check if text is provided
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text content for your post',
      });
    }

    if (text.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Post content cannot exceed 500 characters',
      });
    }

    // 2. Create the post using authenticated user ID from JWT middleware (req.user)
    let post = await Post.create({
      user: req.user._id,
      text: text.trim(),
      image: image && typeof image === 'string' ? image.trim() : '',
    });

    // 3. Populate user author information (omitting sensitive fields like password)
    post = await post.populate('user', 'name email bio profilePicture');

    // 4. Send success response
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: {
        id: post._id,
        text: post.text,
        image: post.image,
        user: {
          id: post.user._id,
          name: post.user.name,
          email: post.user.email,
          bio: post.user.bio,
          profilePicture: post.user.profilePicture,
        },
        createdAt: post.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get news feed (all posts in reverse chronological order)
 * @route   GET /api/posts
 * @access  Private (JWT required)
 */
exports.getPosts = async (req, res, next) => {
  try {
    // Optional pagination query parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    const total = await Post.countDocuments();

    // Fetch posts sorted by newest first (createdAt: -1)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('user', 'name email bio profilePicture');

    const formattedPosts = posts.map((post) => ({
      id: post._id,
      text: post.text,
      image: post.image,
      user: post.user
        ? {
            id: post.user._id,
            name: post.user.name,
            email: post.user.email,
            bio: post.user.bio,
            profilePicture: post.user.profilePicture,
          }
        : null,
      createdAt: post.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedPosts.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      posts: formattedPosts,
    });
  } catch (error) {
    next(error);
  }
};
