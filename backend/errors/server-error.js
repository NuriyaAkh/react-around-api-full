const { HTTP_INTERNAL_SERVER_ERROR } = require('../utils/error');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
