const router = require('express').Router({ mergeParams: true });

const {
  getAllUsers, getUser, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const { userErrorHandler } = require('../middleware/errorHandler');

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
// an error handler is the last middleware:
router.use(userErrorHandler);

module.exports = router;
