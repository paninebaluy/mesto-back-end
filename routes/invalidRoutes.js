const invalidUrl = require('express').Router({ mergeParams: true });

invalidUrl.all('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = invalidUrl;
