const Card = require('../models/card');

// GET /cards — возвращает все карточки
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200, 'OK').json({ data: cards }))
    .catch(next); // passes the data to errorHandler middleware
};

// POST /cards — создаёт карточку
const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.status(201, 'Created').json({ data: card }))
    .catch(next); // passes the data to errorHandler middleware
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card !== null) {
        res.status(200, 'OK').json({ message: 'card deleted:', data: card });
      } else {
        next();
      }
    })
    .catch(next); // passes the data to errorHandler middleware
};

module.exports = {
  getAllCards,
  postCard,
  deleteCard,
};
