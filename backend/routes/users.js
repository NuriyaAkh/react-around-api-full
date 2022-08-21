const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  getCurrentUser,
  // createNewUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.get('/users/me', getCurrentUser);
// router.post('/users', createNewUser);
router.patch('/users/me', updateUserData);
router.patch('users/me/avatar', updateUserAvatar);

module.exports = router;
