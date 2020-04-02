const invalidUrl = require('express').Router({ mergeParams: true });
const NotFoundError = require('../errors/notFoundError');

// eslint-disable-next-line no-unused-vars
invalidUrl.all('*', (req, res) => {
  throw new NotFoundError('Not Found');
});

module.exports = invalidUrl;
