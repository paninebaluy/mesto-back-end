const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https'], require_tld: true, require_protocol: true, require_host: true, require_valid_protocol: true, allow_underscores: true, disallow_auth: true,
      }),
      message: 'Must be a Valid URL',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
