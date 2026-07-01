const jwt = require('jsonwebtoken');

/**
 * Generates a signed JSON Web Token (JWT) for a user ID
 * @param {string} id - The MongoDB User ID
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = generateToken;
