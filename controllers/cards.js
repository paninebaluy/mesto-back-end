const Card = require('../models/card');

// GET /cards — возвращает все карточки
const getAllCards = (async (req, res, next) => {
  const cards = await Card.find({})
    .sort({ createdAt: -1 })
    .populate('likes');
  try {
    res.status(200).send({ data: cards });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});

// POST /cards — создаёт карточку
const postCard = (async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data: card });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
async function deleteCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.id);
    if (card && (req.user._id.toString() !== card.owner.toString())) {
      throw new Error('Unauthorized'); // passes the data to errorHandler middleware
    }
    if (!card || !req.params.id) {
      throw new Error('Not Found'); // passes the data to errorHandler middleware
    }
    const cardToDelete = await Card.findByIdAndRemove(req.params.id)
      .populate('likes');
    res.status(200).send({ message: 'card deleted:', data: cardToDelete });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
}

// PUT /cards/:cardId/likes — поставить лайк карточке
async function likeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      $addToSet: { likes: req.user._id },
    }, { new: true })
      .populate('likes');
    if (!card || !req.params.id) {
      throw new Error('Not Found'); // passes the data to errorHandler middleware
    }
    res.status(200).send({ data: card });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
}

// DELETE /cards/:cardId/likes — убрать лайк с карточки
async function dislikeCard(req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    }, { new: true })
      .populate('likes');
    if (!card || !req.params.id) {
      throw new Error('Not Found'); // passes the data to errorHandler middleware
    }
    res.status(200).send({ message: 'like removed:', data: card });
  } catch (err) {
    next(err); // passes the data to errorHandler middleware
  }
}


module.exports = {
  getAllCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
