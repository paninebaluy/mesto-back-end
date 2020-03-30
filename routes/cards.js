const getCardData = require('express').Router({ mergeParams: true });

const cards = require('../data/cards');

getCardData.get('/', (req, res) => res.status(200).send(cards));

module.exports = getCardData;
