const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new UnauthorizedError('No token supplied'));
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return next(new UnauthorizedError('Invalid token'));
      }
      req.user = payload;
      return next();
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
