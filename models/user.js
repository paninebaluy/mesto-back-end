const mongoose = require('mongoose');
const validator = require('validator');

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
});

module.exports = mongoose.model('user', userSchema);
