require('dotenv').config(); // env-переменные добавлены в process.env

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const helmet = require('helmet');

const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

const app = express();

app.use(helmet());
// app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // for parsing data as JSON
app.use(bodyParser.urlencoded({ extended: true })); // accepting various file types in POST requests
app.use(cookies());
// app uses routing described in a a separate module
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', auth, router); // защитите авторизацией все маршруты, кроме создания нового пользователя и логина
// an error handler is the last middleware:
app.use(errorHandler);

module.exports = app;
