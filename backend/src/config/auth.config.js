require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'rotary-club-secret-key',
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION) || 86400, // in seconds (24h default)
};
