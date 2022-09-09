const {handleError, errorTypes } = require("../utils");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { HTTP_SUCCESS_OK } = require("../utils/error");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const AuthorizationError = require("../errors/authorization-error");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
// console.log(process.env);

const getCurrentUser = (req, res, next) => {
  // console.log(req);
   const currentUser = req.user._id;
  // console.log("currentUser",{ currentUser });
   User.findById(currentUser)
     .orFail(new NotFoundError("No user found with matching id"))
     .then((user) => res.send(user))
     .catch(next);
 };

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      //console.log("user", user);
      // console.log(
      //   "controllers/user.js ",
      //   NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
      // );
      // console.log("environment:", NODE_ENV);
      // authentication successful! user is in the user variable
      const token = jwt.sign(
        { _id: user._id },

        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        },
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      next(new AuthorizationError("Incorrect email or password"));
      console.log("error from login",err);
    });
};
const getUsers = (req, res, next) =>
  User.find({})
    .orFail(new NotFoundError("Users are not found"))
    .then((users) => res.status(HTTP_SUCCESS_OK).send(users))
    .catch(next);

const getUsersById = (req, res, next) => {
  console.log("req.params.id", req.params.id);//?
  return User.findById(req.params.id)
    .orFail(new NotFoundError("No user found with that id"))
    .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
    .catch(next);
};

const createNewUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  //console.log("body", req.body.password);
  User.findOne({ email })
    .then((user) => {
      //console.log("user", user);

      if (user) {
        throw new ConflictError(
          "The user with the provided email already exists"
        );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => {
      //console.log(hash);

      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Missing or invalid email or password"));
      } else {
        next(err);
      }
    });
};
const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("No user found with matching id"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid name or about"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid User ID"));
      } else {
        next(err);
      }
    });
};
const updateUserAvatar = (req, res, next) => {
  console.log(req.body);
console.log(req.user._id);
console.log("avatar controller");
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("No user found with matching id"))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid avatar URL"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid User ID"));
      } else {
        next(err);
      }
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
