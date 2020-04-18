const mongoose = require('mongoose');

const Card = require('../models/card');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

// GET /cards — возвращает все карточки
const getAllCards = (async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .sort({ createdAt: -1 })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ data: cards });
  } catch (err) {
    return next(err); // passes the data to errorHandler middleware
  }
});

// POST /cards — создаёт карточку
const postCard = (async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send({ data: card });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже карточка
    }
    if (!card.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const cardToDelete = await Card.findByIdAndRemove(id)
      .populate('likes').populate('owner');
    return res.status(200).send({ message: 'card deleted:', data: cardToDelete });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('Not Found'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return next(new NotFoundError('Not found'));
    }
    const cardToUpdate = await Card.findByIdAndUpdate(id, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ data: cardToUpdate });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('Not Found'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return next(new NotFoundError('Not Found'));
    }
    const cardToDislike = await Card.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    return res.status(200).send({ message: 'like removed:', data: cardToDislike });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('Not Found'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});


module.exports = {
  getAllCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
