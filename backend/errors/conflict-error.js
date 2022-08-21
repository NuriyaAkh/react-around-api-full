const { HTTP_CONFLICT_ERROR } = require('../utils/error');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
