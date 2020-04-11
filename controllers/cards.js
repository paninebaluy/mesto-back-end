const Card = require('../models/card');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

// GET /cards — возвращает все карточки
const getAllCards = (async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .sort({ createdAt: -1 })
      .populate('likes')
      .populate('owner');
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});

// POST /cards — создаёт карточку
const postCard = (async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data: card });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return next(new NotFoundError('Not Found'));
    }
    if (card && !card.owner.equals(req.user._id)) {
      next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const cardToDelete = await Card.findByIdAndRemove(req.params.id)
      .populate('likes').populate('owner');
    return res.status(200).send({ message: 'card deleted:', data: cardToDelete });
  } catch (err) {
    return next(err); // passes the data to errorHandler middleware
  }
});

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      next(new NotFoundError('Not Found'));
    }
    const cardToUpdate = await Card.findByIdAndUpdate(req.params.id, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    res.status(200).send({ data: cardToUpdate });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      throw new NotFoundError('Not Found');
    }
    const cardToDislike = await Card.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    }, { new: true })
      .populate('likes')
      .populate('owner');
    res.status(200).send({ message: 'like removed:', data: cardToDislike });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});


module.exports = {
  getAllCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
