const PORT = process.env.PORT || 3000;

let JWT_SECRET;
const isProduction = process.env.NODE_ENV === 'production'; // if production, we use secret from env file

if (isProduction) {
  JWT_SECRET = process.env.JWT_SECRET;
}
JWT_SECRET = 'devSecretKey'; // for dev mode, we use 'devSecretKey'

module.exports = {
  PORT,
  JWT_SECRET,
};
