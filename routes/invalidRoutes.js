const invalidUrl = require('express').Router({ mergeParams: true });

invalidUrl.all('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

module.exports = invalidUrl;
