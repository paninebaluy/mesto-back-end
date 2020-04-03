const PORT = process.env.PORT || 3000;
const admin = {
  _id: '5e81d3cbcbd0791fd0f8bd2f', // temporary auth solution
};

const auth = (req, res, next) => {
  req.user = admin;
  next();
};

module.exports = {
  auth,
  admin,
  PORT,
};
