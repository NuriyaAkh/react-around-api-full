const errorTypes = {
  SERVER_ERROR: 500,
  OK: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};
const handleError = (err, req, res) => {
  if (err.name === 'DocumentNotFoundError') {
    res
      .status(errorTypes.NOT_FOUND)
      .send({ message: `Requested information not found ${err}` });
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(errorTypes.BAD_REQUEST)
      .send({ message: `Please make a valid request ${err}` });
  } else {
    res
      .status(errorTypes.SERVER_ERROR)
      .send({ message: `An error has occurred on the server ${err}` });
  }
};

module.exports = { handleError, errorTypes };
