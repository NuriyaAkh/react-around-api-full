const router = require("express").Router();

const {
  getUsers,
  getUsersById,
  getCurrentUser,
  // createNewUser,
  updateUserData,
  updateUserAvatar,
} = require("../controllers/user");
const {
  validateRequestAuth,
  validateUserId,
} = require("../middleware/validation");

router.get("/users", validateUserId, getUsers);

router.get("/users/me", validateUserId, getCurrentUser);

router.get("/users/:id", validateUserId, getUsersById);

// router.post('/users', createNewUser);
router.patch("/users/me", validateRequestAuth, updateUserData);
router.patch("/me/avatar", validateRequestAuth, updateUserAvatar);

module.exports = router;
