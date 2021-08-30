const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const { ErrorHandler, errType } = require('./error/ErrorHandler');
const { validationSignIn, validationSignUp } = require('./middlewares/validators');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const auth = require('./middlewares/auth');
const { checkErrors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);

app.use('/users', auth, routerUser);
app.use('/cards', auth, routerCard);
app.use('*', (req, res, next) => next(new ErrorHandler(errType.global, 404)));

app.use(errorLogger);

app.use(errors());
app.use(checkErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('start');
});
