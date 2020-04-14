const router = require('express').Router({ mergeParams: true });

const {
  getAllUsers, getUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
