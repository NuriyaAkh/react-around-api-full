const router = require("express").Router();

const {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const {
  validateRequestAuth,
  validateCard,
  validateCardId,
} = require("../middleware/validation");

router.get("/cards", validateRequestAuth, getCards);

router.post("/cards", validateRequestAuth, validateCard, createNewCard);

router.delete(
  "/cards/:cardId",
  validateRequestAuth,
  validateCardId,
  deleteCard
);
router.put(
  "/cards/:cardId/likes",
  validateRequestAuth,
  validateCardId,
  likeCard
);
router.delete(
  "/cards/:cardId/likes",
  validateRequestAuth,
  validateCardId,
  dislikeCard
);

module.exports = router;
