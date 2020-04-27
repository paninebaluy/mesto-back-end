const router = require('express').Router({ mergeParams: true });

const {
  getAllCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, mongooseObjectIdValidator } = require('../middleware/validation-celebrate');

router.get('/', getAllCards);
router.post('/', cardValidator, postCard);
router.delete('/:id', mongooseObjectIdValidator, deleteCard);
router.put('/:id/likes', mongooseObjectIdValidator, likeCard);
router.delete('/:id/likes', mongooseObjectIdValidator, dislikeCard);

module.exports = router;
