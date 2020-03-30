const router = require('express').Router({ mergeParams: true });
const { getAllUsers } = require('../controllers/users');

const users = require('../data/users');
const responses = require('../data/responses');

router.get('/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (!user) {
    const { userNotFound } = responses.find((response) => response.userNotFound);
    res.status(404).send(userNotFound);
    return;
  }
  res.status(200).send(user);
});

router.get('/', getAllUsers); // imported from ../controllers

module.exports = router;
