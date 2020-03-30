const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({ data: users}))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}`}));
}

module.exports = {
  getAllUsers,
};
