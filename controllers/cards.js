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
  const owner = req.user._id;
  Card.create({ name, link, owner })
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

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200, 'OK').json({ data: card }))
    .catch(next); // passes the data to errorHandler middleware
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.status(200, 'OK').json({ message: 'like removed:', data: card }))
    .catch(next); // passes the data to errorHandler middleware
};


// DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = {
  getAllCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
