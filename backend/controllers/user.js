const handleError = require("../utils");
const { errorTypes } = require("../utils");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res) =>
  User.find({})
    .orFail()
    .then((users) => res.status(errorTypes.OK).send(users))
    .catch((err) => {
      handleError(err, req, res);
    });

const getUsersById = (req, res) =>
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(errorTypes.OK).send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });

const createNewUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
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
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No user found with that id");
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
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      // return an authentication error?
      res.status(401).send({ message: err.message });
    });
};
const getCurrentUser = (req, res, next) => {
  const currentUser = req.user._id;
  User.findById(currentUser)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
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
  login,
  getCurrentUser,
};
