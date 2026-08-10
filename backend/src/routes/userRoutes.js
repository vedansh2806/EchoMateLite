// ============================================================
// userRoutes.js – User Profile API Route Definitions
// ============================================================
// WHY THIS FILE EXISTS:
//   Defines the two user-profile related API routes and protects them
//   with the existing JWT authentication middleware (protect).
//
//   All routes under this file require a valid JWT token to be sent
//   in the Authorization header as: "Bearer <token>"
//
//   Routes:
//     GET  /api/users/profile  → Retrieve the authenticated user's profile
//     PUT  /api/users/profile  → Update the authenticated user's profile
// ============================================================

const express = require('express');
const router = express.Router();

// Import the JWT protection middleware (already written – reusing, not duplicating)
const { protect } = require('../middleware/authMiddleware');

// Import the profile controller functions
const { getProfile, updateProfile } = require('../controllers/userController');

// ---- Route Definitions ----
// The protect middleware runs BEFORE the controller function on every request.
// If the token is missing or invalid, protect() returns a 401 immediately
// and the controller never executes.

router.get('/profile', protect, getProfile);   // GET  /api/users/profile
router.put('/profile', protect, updateProfile); // PUT  /api/users/profile

module.exports = router;
