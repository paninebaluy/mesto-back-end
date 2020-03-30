const User = require('../models/user');

// GET /users — возвращает всех пользователей
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200, 'OK').json({ data: users }))
    .catch(next); // passes the data to error handler
};

// GET /users/:userId - возвращает пользователя по _id
const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.status(200, 'OK').json({ data: user }))
    .catch(next); // passes the data to error handler
};

// POST /users — создаёт пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201, 'Created').json({ data: user }))
    .catch(next); // passes the data to error handler
};

// PATCH /users/me — обновляет профиль


// PATCH /users/me/avatar — обновляет аватар

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
