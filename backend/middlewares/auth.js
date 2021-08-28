const jwt = require('jsonwebtoken');
const { ErrorHandler, errType } = require('../error/ErrorHandler');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    const err = new ErrorHandler(errType.auth, 401);
    next(err);
    return;
  }

  const token = auth.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new ErrorHandler(errType.auth, 401));
  }

  req.user = payload;
  next();
};
