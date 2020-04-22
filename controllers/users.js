const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const BadRequestError = require('../errors/badRequestError');

const { JWT_SECRET } = process.env;

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
    if (!user) {
      throw new NotFoundError('Not Found');
    }
    res.status(200).send({ data: user });
  } catch (err) {
    next(err); // passes the data to error handler
  }
});

// POST /users — создаёт пользователя
const createUser = (async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }); // данные всех полей должны приходить в теле запроса (кроме пароля)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// PATCH /users/me — обновляет профиль
const updateUserProfile = (async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about },
      { new: true, runValidators: true });
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar },
      { new: true, runValidators: true });
    return res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err); // passes the data to error handler
  }
});

// login - получает из запроса почту и пароль и проверяет их
const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, JWT_SECRET, { // JWT после создания должен быть отправлен клиенту
      maxAge: '7d',
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(200).send({ token });
  } catch (err) {
    next(new UnauthorizedError(err.message)); // passes the data to error handler
  }
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
