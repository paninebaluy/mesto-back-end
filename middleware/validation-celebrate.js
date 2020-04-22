const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/badRequestError');

const errors = {
  about: new BadRequestError('"About" must contain 2 to 30 symbols'),
  name: new BadRequestError('Name must contain 2 to 30 symbols'),
  avatar: new BadRequestError('Field "avatar" must be a valid URL'),
  email: new BadRequestError('Email is required'),
  password: new BadRequestError('Password must contain at least 8 characters'),
  link: new BadRequestError('Link must be a valid URL'),
  id: new BadRequestError('Must be a Mongoose ObjectID'),
};

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    about: Joi.string().required().min(2).max(30)
      .error(errors.about),
    avatar: Joi.string().required()
      .regex(/^(http|https):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z1-9_-]+\.[А-ЯЁа-яёA-Za-z1-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z1-9/-]*)?#?$/)
      .error(errors.avatar),
    email: Joi.string().required().email()
      .error(errors.email),
    password: Joi.string().required().min(8)
      .error(errors.password),
  }),
});


const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errors.email),
    password: Joi.string().required().min(8)
      .error(errors.password),
  }),
});

const profileUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    about: Joi.string().required().min(2).max(30)
      .error(errors.about),
  }),
});

const avatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .regex(/^(http|https):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z1-9_-]+\.[А-ЯЁа-яёA-Za-z1-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z1-9/-]*)?#?$/)
      .error(errors.avatar),
  }),
});


const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    link: Joi.string().required().regex(/^(http|https):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z1-9_-]+\.[А-ЯЁа-яёA-Za-z1-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z1-9/-]*)?#?$/)
      .error(errors.link),
  }),
});

const mongooseObjectIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .error(errors.id),
  }),
});

module.exports = {
  userValidator,
  loginValidator,
  cardValidator,
  avatarUpdateValidator,
  profileUpdateValidator,
  mongooseObjectIdValidator,
};
