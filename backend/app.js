const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createNewUser, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/cors');
const auth = require('./middleware/auth');
const { validateLogin } = require('./middleware/validation');

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include these before other routes
app.use((req, res, next) => {
  const { origin } = req.headers; // saving the request source to the 'origin' variable
  // checking that the source of the request is mentioned in the list of allowed ones
  if (allowedCors.includes(origin)) {
    // setting a header that allows the browser to make requests from this source
    res.header('Access-Control-Allow-Origin', origin);
  }
  // setting a header that allows the browser to make requests from any source
  res.header('Access-Control-Allow-Origin', '*');
  const { method } = req; // Saving the request type (HTTP method) to the corresponding variable

  // // Default value for Access-Control-Allow-Methods header (all request types are allowed)
  // const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  // If this is a preliminary request, add the required headers
  if (method === 'OPTIONS') {
    // allowing cross-domain requests of any type (default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  // saving the list of headers of the original request
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // allowing cross-domain requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // finish processing the request and return the result to the client
    return res.end();
  }

  return next();
});
// app.use(cors());
// app.options('*', cors()); // enable requests for all routes
app.use(requestLogger); // enabling the request logger
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateLogin, createNewUser);
// authorization
app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.use(errorLogger); // enabling the error logger
// error handlers
app.use(errors()); // celebrate error handler

// centralized error handler
app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
