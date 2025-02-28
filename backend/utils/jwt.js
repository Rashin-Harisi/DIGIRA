const jwt = require('jsonwebtoken');

// Function to issue a token
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' }); // Set an expiry
};

module.exports = {generateToken};