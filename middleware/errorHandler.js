// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => res.status(error.status || 500).send({
  error: {
    status: error.status,
    message: error.message,
  },
});

module.exports = errorHandler;
