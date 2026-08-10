// ============================================================
// userController.js – User Profile Business Logic
// ============================================================
// WHY THIS FILE EXISTS:
//   Handles all user-profile related logic for authenticated users.
//   Two actions are supported:
//     1. GET  – Retrieve the currently authenticated user's profile.
//     2. PUT  – Update allowed profile fields (name, bio, profilePicture).
//
//   This controller NEVER handles password changes, JWT data, or _id.
//   All routes that use this controller are protected by authMiddleware.
//   The protect middleware runs first and attaches the full user document
//   to req.user, so the controller always has access to the calling user.
// ============================================================

const User = require('../models/User');

// ============================================================
// @desc    Get authenticated user's profile
// @route   GET /api/users/profile
// @access  Private (JWT required)
// ============================================================
exports.getProfile = async (req, res, next) => {
  try {
    // req.user is populated by the protect middleware (authMiddleware.js).
    // It already contains the full user document from MongoDB,
    // with password excluded because the schema has select: false on that field.
    const user = await User.findById(req.user._id);

    // Defensive check: if the user was deleted between token issuance and now
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. The account may have been deleted.',
      });
    }

    // Return the profile fields — password is NOT selected by default (schema: select: false)
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// @desc    Update authenticated user's profile
// @route   PUT /api/users/profile
// @access  Private (JWT required)
// ============================================================
exports.updateProfile = async (req, res, next) => {
  try {
    // --- Step 1: Build an object of only the ALLOWED fields ---
    // We extract explicitly so that a malicious payload cannot update
    // protected fields like password, email, or _id by sneaking them
    // into the request body.
    const { name, bio, profilePicture } = req.body;

    // Ensure the request body actually contains at least one field to update
    if (name === undefined && bio === undefined && profilePicture === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one field to update: name, bio, or profilePicture.',
      });
    }

    // --- Step 2: Field-level validation ---

    // name validation: if provided, must be a non-empty string
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Name cannot be empty.',
        });
      }
    }

    // bio validation: if provided, must respect the 200-character schema limit
    if (bio !== undefined) {
      if (typeof bio !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Bio must be a string.',
        });
      }
      if (bio.length > 200) {
        return res.status(400).json({
          success: false,
          message: 'Bio cannot be more than 200 characters.',
        });
      }
    }

    // profilePicture validation: if provided, must be a non-empty string (URL or S3 key)
    if (profilePicture !== undefined) {
      if (typeof profilePicture !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'profilePicture must be a string (URL or S3 key).',
        });
      }
    }

    // --- Step 3: Build the update payload dynamically ---
    // Only include fields that were actually sent in the request
    const updateFields = {};
    if (name !== undefined)           updateFields.name           = name.trim();
    if (bio !== undefined)            updateFields.bio            = bio.trim();
    if (profilePicture !== undefined) updateFields.profilePicture = profilePicture.trim();

    // --- Step 4: Apply the update in MongoDB ---
    // findByIdAndUpdate with { new: true } returns the UPDATED document.
    // { runValidators: true } ensures Mongoose schema validators still run
    //   (e.g., the maxlength constraint on bio is enforced at the DB layer too).
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found. The account may have been deleted.',
      });
    }

    // --- Step 5: Return the updated profile (without password) ---
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
