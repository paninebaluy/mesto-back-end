// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const baseHandler = (error) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status,
        message: error.message,
      },
    });
  };
  const error = err;

  // wrong id errors
  if (err.message.includes('Cast to ObjectId failed'
   || err.message.includes("Cannot read property 'data' of null"))) {
    error.status = 400;
    error.message = 'ObjectID does not exist';
    return baseHandler(error);
  }
  // validation errors
  if (err.message.includes('Not enough data')
  || err.message.includes('validation failed')
  || err.message.includes('Validation failed')
  || err.message.includes('One or more of fields required')) {
    error.status = 400;
    return baseHandler(error);
  }
  // 403 unauthorized
  if (err.message.includes('Unauthorized')) {
    error.status = 403;
    return baseHandler(error);
  }
  // 404 errors
  if (err.message.includes('Not Found')) {
    error.status = 404;
    return baseHandler(error);
  }
  return baseHandler(err); // 500 by default
};

module.exports = errorHandler;
