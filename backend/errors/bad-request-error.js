const { HTTP_BAD_REQUEST_ERROR } = require('../utils/error');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestError;
