const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Card name requiered '],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Card link required'],
    validate: {
      validator: (v) => {
        /https?:\/\/(www\.)?\S+\/[-._~:/?%#[\]@!$&'()*+,;=\w]*#?$/.test(v);
      },
      message: 'Please enter a valid link starting with "http" or "https"',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [
    {
      type: Array,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
