const logger = (req, res, next) => {
  console.log(new Date());
  console.log(`request method: ${req.method}, request URL: ${req.originalUrl}`);
  next();
};

module.exports = logger;
