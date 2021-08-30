const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validationURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильная ссылка');
  }
  return value;
};

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

module.exports.validationUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationURL),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validationURL),
  }),
});

module.exports.validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports.validationAddLikes = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports.validationDeleteLikes = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports.validationSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().custom(validationURL).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validationSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
