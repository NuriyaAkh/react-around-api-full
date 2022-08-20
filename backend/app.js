const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createNewUser, login } = require('../controllers/users');

require('dotenv').config();

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62c9db8f6db879685b8a9d3f',
  };
  next();
});
app.post('/signin', login);
app.post('/signup', createNewUser);
// authorization
app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
