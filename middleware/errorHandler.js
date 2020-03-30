const User = require('../models/user');
const Card = require('../models/card');

const userErrorHandler = (error, req, res, next) => {
  if (!User.about || !User.name || !User.avatar) {
    res.status(400, 'Bad Request').send({ message: error.message });
  }
  if (!User._id) {
    res.status(404, 'Not Found').json({ message: error.message });
  }
  res.sendStatus(500);

  next();
};

const cardErrorHandler = (error, req, res, next) => {
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
