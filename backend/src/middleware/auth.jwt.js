// File: middleware/auth.jwt.js

const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.users;

verifyToken = (req, res, next) => {
  // Get token from Authorization header
  let token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  // Remove Bearer from token string if present
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).send({
        message: 'User not found!'
      });
    }
    
    if (user.role === 'admin') {
      next();
      return;
    }
    
    res.status(403).send({
      message: 'Requires Admin Role!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Unable to validate user role!'
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt;