const User = require('../models/user');

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
    if (!user || !req.params.id) {
      throw new Error('Not Found'); // passes the data to errorHandler middleware
    }
    res.status(200).send({ data: user });
  } catch (err) {
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
  const { name, about, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body,
      { new: true, runValidators: true });
    if (!(name || about || avatar)) {
      throw new Error('One or more of fields required: name, about, avatar');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body,
      { new: true, runValidators: true });
    if (!avatar) {
      throw new Error('One or more of fields required: avatar');
    }
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
