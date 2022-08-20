const handleError = require('../utils');
const { errorTypes } = require('../utils');
const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .orFail()
  .then((users) => res.status(errorTypes.OK).send(users))
  .catch((err) => {
    handleError(err, req, res);
  });

const getUsersById = (req, res) => User.findById(req.params.id)
  .orFail(() => {
    const error = new Error('No user found with that id');
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.status(errorTypes.OK).send({ data: user }))
  .catch((err) => {
    handleError(err, req, res);
  });

const createNewUser = (req, res) => {
  const { name, about, avatar, email, password} = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createNewUser,
  updateUserData,
  updateUserAvatar,
};
