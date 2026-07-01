const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes by verifying JWT tokens
 * Appends authenticated user details to `req.user`
 */
exports.protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from database using decoded id (exclude password)
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found',
        });
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed or expired',
      });
    }
  }

  // 4. Return error if token does not exist
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token missing in Authorization header',
    });
  }
};
