require('dotenv').config(); // env-переменные добавлены в process.env

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookies = require('cookie-parser');

const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config');
const auth = require('./middleware/auth');

const app = express();

app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // for parsing data as JSON
app.use(bodyParser.urlencoded({ extended: true })); // accepting various file types in POST requests
app.use(express.static(path.join(__dirname, 'public/dist'))); // for serving static files from public/dist dir
app.use(cookies());
// app uses routing described in a a separate module
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', auth, router); // защитите авторизацией все маршруты, кроме создания нового пользователя и логина
// an error handler is the last middleware:
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
