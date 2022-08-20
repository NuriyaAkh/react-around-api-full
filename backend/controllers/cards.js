const handleError = require('../utils');
const { errorTypes } = require('../utils');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(errorTypes.OK).send(cards))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

module.exports = {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
