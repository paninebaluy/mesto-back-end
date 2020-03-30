const auth = (req, res, next) => {
  req.user = {
    _id: '5e81d3cbcbd0791fd0f8bd2f', // temporary auth solution
  };

  next();
};

module.exports = auth;
