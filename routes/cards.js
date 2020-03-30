const router = require('express').Router({ mergeParams: true });

const { getAllCards, postCard, deleteCard } = require('../controllers/cards');
const { cardErrorHandler } = require('../middleware/errorHandler');

router.get('/', getAllCards);
router.post('/', postCard);
router.delete('/:id', deleteCard);
// an error handler is the last middleware:
router.use(cardErrorHandler);

module.exports = router;
