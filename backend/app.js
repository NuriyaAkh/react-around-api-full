const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createNewUser, login } = require("./controllers/user");
const { requestLogger, errorLogger } = require("./middleware/logger");

const auth = require("./middleware/auth");
app.use(helmet());
mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62c9db8f6db879685b8a9d3f',
//   };
//   next();
// });

// include these before other routes
app.use(cors());
app.options("*", cors()); //enable requests for all routes

app.use(requestLogger); // enabling the request logger

app.post("/signin", login);
app.post("/signup", createNewUser);
// authorization
app.use(auth);
app.use("/", userRouter);
app.use("/", cardsRouter);

app.use(errorLogger); // enabling the error logger
// error handlers
app.use(errors()); // celebrate error handler

// centralized error handler
app.use((err, req, res, next) => {
  console.log(err);
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
