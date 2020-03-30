const mongoose = require('mongoose');

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
    match: /^https?:\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z1-9_-]+\.[А-ЯЁа-яёA-Za-z1-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z1-9/-]*)?#?.*$/i,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: Array,
    default: [], // implicit, so this field is optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
