const { HTTP_AUTHORIZATION_ERROR } = require('../utils/error');

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_AUTHORIZATION_ERROR;
  }
}

module.exports = AuthorizationError;
