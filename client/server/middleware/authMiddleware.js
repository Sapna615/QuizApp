const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('No token provided');
    }

    try {
      // Extract token
      token = authHeader.split(' ')[1];
      if (!token) {
        res.status(401);
        throw new Error('No token provided');
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.id) {
        res.status(401);
        throw new Error('Invalid token');
      }

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      // Attach user to request
      req.user = user;
      req.user.role = decoded.role || 'user'; // Default to 'user' role if not specified
      
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      res.status(401);
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      } else if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Not authorized, token verification failed');
    }
  } catch (error) {
    next(error);
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
