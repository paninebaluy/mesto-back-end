const mongoose = require('mongoose');

const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');

// GET /users — возвращает всех пользователей
const getAllUsers = (async (req, res, next) => {
  try {
    const users = await User.find({})
      .sort('name');
    res.status(200).send({ data: users });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// GET /users/:userId - возвращает пользователя по _id
const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(new NotFoundError('Not Found'));
    }
    next(err); // passes the data to error handler
  }
});

// POST /users — создаёт пользователя
const createUser = (async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(201).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// PATCH /users/me — обновляет профиль
const updateUserProfile = (async (req, res, next) => {
  const { name, about } = req.body;
  try {
    if (!(name || about)) {
      throw new InternalServerError('One or more of fields required: name, about');
    }
    const user = await User.findByIdAndUpdate(req.user._id, { name, about },
      { new: true, runValidators: true });
    res.status(200).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (async (req, res, next) => {
  const { avatar } = req.body;
  try {
    if (!avatar) {
      throw new InternalServerError('One or more of fields required: avatar');
    }
    const user = await User.findByIdAndUpdate(req.user._id, { avatar },
      { new: true, runValidators: true });
    res.status(200).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
