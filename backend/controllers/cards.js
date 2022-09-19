const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('No cards found'))
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Card not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        const error = new Error('Action forbidden');
        error.statusCode = 403;
        throw error;
      }

      Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => {
          const error = new Error('Card not found');
          error.statusCode = 404;
          throw error;
        })
        .then((cardData) => res.send(cardData));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Card ID not found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
