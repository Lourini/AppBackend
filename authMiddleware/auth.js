// auth.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret key
// Secret key for signing and verifying JWT tokens
const secretKey = crypto.randomBytes(32).toString('hex');

// Function to create a new JWT token
exports.createToken = (user) => {
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '4h' });
  return token;
};

// Middleware function to authenticate JWT tokens
exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Function to check if the user has a specific role
exports.checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
    }
  };
};