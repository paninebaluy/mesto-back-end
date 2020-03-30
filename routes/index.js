const router = require('express').Router();

const getUserData = require('./users');
const getCardData = require('./cards');
const invalidUrl = require('./invalidRoutes');

router.use('/users', getUserData);
router.use('/cards', getCardData);
router.use('*', invalidUrl);

module.exports = router;
