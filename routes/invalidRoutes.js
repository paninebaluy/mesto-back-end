const invalidUrl = require('express').Router({ mergeParams: true });

const responses = require('../data/responses');

invalidUrl.all('*', (req, res) => {
  const { pageNotFound } = responses.find((response) => response.pageNotFound);
  res.status(404).send(pageNotFound);
});

module.exports = invalidUrl;
