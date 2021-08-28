const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив-Кусто',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (valid) => /https?:\/\/(\w{3}\.)?[-._~:/?#[\]@!$&'()*+,;=\w]+#?\d/gi.test(valid),
      message: 'Некоректная ссылка',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (valid) => validator.isEmail(valid),
      message: 'Неправалидная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line consistent-return
userSchema.statics.findUserByCredentials = async function login(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return user;
    }
    return undefined;
  }
};

module.exports = mongoose.model('user', userSchema);
