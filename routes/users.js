const router = require('express').Router({ mergeParams: true });

const {
  getAllUsers, getUser, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
