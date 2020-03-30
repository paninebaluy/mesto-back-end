const User = require('../models/user');
const Card = require('../models/card');

const userErrorHandler = (error, req, res, next) => {
  if (req.user._id !== '5e81d3cbcbd0791fd0f8bd2f') {
    res.sendStatus(403).json({ message: error.message });
  }
  if (!User.about || !User.name || !User.avatar) {
    res.status(400, 'Bad Request').send({ message: error.message });
  }
  if ((req.method === 'POST' || req.method === 'GET') && !User._id) {
    res.status(404, 'Not Found').json({ message: error.message });
  }
  if (req.method === 'PATCH' && req.originalUrl === '/users/me'
    && (!req.body.name || !req.body.about || !req.body.avatar)) {
    res.status(400, 'Bad Request').json({ message: error.message });
  }
  if (req.method === 'PATCH' && !req.body.avatar && req.originalUrl === 'users/me/avatar') {
    res.status(400, 'Bad Request').json({ message: error.message });
  }
  res.sendStatus(500).json({ message: error.message });

  next();
};

const cardErrorHandler = (error, req, res, next) => {
  if (req.user._id !== '5e81d3cbcbd0791fd0f8bd2f') {
    res.sendStatus(403).json({ message: error.message });
  }
  if (!Card.name || !Card.link) {
    res.status(400).json({ message: error.message });
  }
  if (!Card._id || !Card) {
    res.status(404, 'Not Found').json({ message: error.message });
  }
  if (res.body.data === null) {
    res.status(404, 'Not Found').json({ message: error.message });
  }
  res.sendStatus(500);

  next();
};


module.exports = {
  userErrorHandler,
  cardErrorHandler,
};
