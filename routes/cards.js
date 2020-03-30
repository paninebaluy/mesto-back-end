const router = require('express').Router({ mergeParams: true });

const {
  getAllCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardErrorHandler } = require('../middleware/errorHandler');

router.get('/', getAllCards);
router.post('/', postCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);
// an error handler is the last middleware:
router.use(cardErrorHandler);

module.exports = router;
