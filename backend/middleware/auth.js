const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorizationError('Authorization Required'));
  }
  // getting the token
  const token = authorization.replace('Bearer ', '');
  // verifying the token
  let payload;
  try {
    // trying to verify the token
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    // we return an error if something goes wrong
    return next(new AuthorizationError('Authorization Required'));
  }
  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
module.exports = auth;
