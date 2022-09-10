const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Expoler',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => {
        /https?:\/\/(www\.)?\S+\/[-._~:/?%#[\]@!$&'()*+,;=\w]*#?$/.test(v);
      },
      message: 'Please enter a valid link starting with "http" or "https"',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'You must enter a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return (
    this.findOne({ email })
      .select('+password') // this — the User model
      // the password hash will be there, in the user object
      .then((user) => {
        // not found - rejecting the promise
        if (!user) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        // found - comparing hashes
        return bcrypt.compare(password, user.password).then((match) => {
          if (!match) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
      })
  );
};
module.exports = mongoose.model('user', userSchema);
