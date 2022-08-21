const { HTTP_FORBIDDEN_ERROR } = require("../utils/error");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
