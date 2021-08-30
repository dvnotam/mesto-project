const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Error = require('../middlewares/errors');
const UserSchema = require('../models/users');
const { ErrorHandler, errType } = require('../error/ErrorHandler');

module.exports.getUser = async (req, res, next) => {
  try {
    const users = await UserSchema.find({});
    return res.json({ users });
  } catch (err) {
    return next(new ErrorHandler(errType.user, 400));
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.user._id);
    console.log(user)
    return res.json({ _id: user._id, email: user.email, avatar: user.avatar, name: user.name, about: user.about });
  } catch (err) {
    console.log(err)
    return next(new ErrorHandler(errType.user, 500));
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const users = await UserSchema.findById({ _id: req.params.userId })
    console.log(users, '---> user')
    return res.json({ users });
  } catch (err) {
    console.log(err, '---> err')
    switch (err.name) {
      case 'CastError':
      case 'Error':
        return next(new ErrorHandler(errType.user, 404));
      default:
        return next(new ErrorHandler(errType.user, 500));
    }
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, avatar, about, email, password,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      name, avatar, about, email, password: hashPassword,
    });

    return res.send({
      name: user.name,
      avatar: user.avatar,
      about: user.about,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return next(new ErrorHandler(errType.user, 409));
    }

    switch (err.name) {
      case 'ValidationError':
        return next(new ErrorHandler(errType.user, 400));
      default:
        return next(new ErrorHandler(errType.user, 500));
    }
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  try {
    const user = await UserSchema.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    )
    return res.json({ avatar: user.avatar, name: user.name, about: user.about });
  } catch (err) {
    console.log(err)
    switch (err.name) {
      case 'ValidationError':
        return next(new ErrorHandler(errType.user, 400));
      case 'Error':
        return next(new ErrorHandler(errType.user, 404));
      default:
        return next(new ErrorHandler(errType.user, 500));
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  try {
    const user = await UserSchema.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    )
    return res.json({ avatar });
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        return next(new ErrorHandler(errType.user, 400));
      case 'Error':
        return next(new ErrorHandler(errType.user, 404));
      default:
        return next(new ErrorHandler(errType.user, 500));
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findUserByCredentials(email, password);

    if (!user) {
      return next(new ErrorHandler(errType.user, 401));
    }

    return res.json({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      id: user._id,
      email: user.email,
      token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
    });
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        return next(new ErrorHandler(errType.auth, 400));
      case 'Error':
        return next(new ErrorHandler(errType.auth, 404));
      default:
        return next(new ErrorHandler(errType.auth, 500));
    }
  }
};
