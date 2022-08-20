const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, "User desciption required"],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
   
    validate: {
      validator: (v) => {
        /https?:\/\/(www\.)?\S+\/[-._~:/?%#[\]@!$&'()*+,;=\w]*#?$/.test(v);
      },
      message: 'Please enter a valid link starting with "http" or "https"',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "You must enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
});
module.exports = mongoose.model("user", userSchema);
