const { HTTP_NOT_FOUND_ERROR } = require('../utils/error');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
