const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorizedError');


const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Must be a valid email',
    },
  },
  password: {
    type: String,
    minlength: 18, // 10 salt + min 8 + hash
    required: true,
    select: false, // чтобы API не возвращал хеш пароля
  },
});

userSchema.statics.findUserByEmail = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('The email or password you entered are not valid'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('The email or password you entered are not valid'));
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, { message: 'User {VALUE} already exists' });

module.exports = mongoose.model('user', userSchema);
