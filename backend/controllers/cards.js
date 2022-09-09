const {handleError, errorTypes} = require("../utils");
const Card = require("../models/card");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const AuthorizationError = require("../errors/authorization-error");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const getCards = (req, res,next) => {

  Card.find({})
    .orFail(new NotFoundError("No cards found"))
    .then((cards) => {
      // console.log(cards);
      res.status(errorTypes.OK).send(cards)})
    .catch(next);
};
const createNewCard = (req, res,next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
 return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res,next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        const error = new Error("Action forbidden");
        error.statusCode = 404;
        throw error;
      }

      Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => {
          const error = new Error("User can delete only own cards");
          error.statusCode = 403;
          throw error;
        })
        .then((card) => res.send({ data: card }));
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};
const likeCard = (req, res,next) => {
  console.log(req.params.cardId)
  Card.findByIdAndUpdate(

    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
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
    { new: true }
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
