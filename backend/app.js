const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

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

app.use('/', userRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
