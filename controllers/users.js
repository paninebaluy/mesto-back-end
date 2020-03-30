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
const updateUserProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (name || about || avatar) {
        res.status(200, 'OK').json({ data: user });
      } else {
        res.status(400, 'Bad Request').json({ message: 'Not a valid property' }); // этот обработчик работает только здесь :(
      }
    })
    .catch(next); // passes the data to error handler
};

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (avatar) {
        res.status(200, 'OK').json({ data: user });
      } else {
        res.status(400, 'Bad Request').json({ message: 'Not a valid property' }); // этот обработчик работает только здесь :(
      }
    })
    .catch(next); // passes the data to error handler
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
