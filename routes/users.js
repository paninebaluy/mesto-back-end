const router = require('express').Router({ mergeParams: true });
const { userErrorHandler } = require('../middleware/errorHandler');

const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.post('/', createUser);
// an error handler is the last middleware:
router.use(userErrorHandler);

module.exports = router;
