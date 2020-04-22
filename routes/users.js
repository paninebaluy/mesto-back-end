const router = require('express').Router({ mergeParams: true });

const {
  getAllUsers, getUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const {
  profileUpdateValidator, avatarUpdateValidator, mongooseObjectIdValidator,
} = require('../middleware/validation-celebrate');

router.get('/:id', mongooseObjectIdValidator, getUser);
router.get('/', getAllUsers);
router.patch('/me', profileUpdateValidator, updateUserProfile);
router.patch('/me/avatar', avatarUpdateValidator, updateUserAvatar);

module.exports = router;
