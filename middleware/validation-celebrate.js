const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');

const errors = {
  about: new BadRequestError('"About" must contain 2 to 30 symbols'),
  name: new BadRequestError('Name must contain 2 to 30 symbols'),
  avatar: new BadRequestError('Field "avatar" must be a valid URL'),
  email: new BadRequestError('Email is required'),
  password: new BadRequestError('Password must contain 8 to 24 characters. Letters from a to z, numbers and special chars are allowed.'),
  link: new BadRequestError('Link must be a valid URL'),
  id: new BadRequestError('Must be a Mongoose ObjectID'),
  login: new UnauthorizedError('The email or password you entered are not valid'),
};

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    about: Joi.string().required().min(2).max(30)
      .error(errors.about),
    avatar: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
      .error(errors.avatar),
    email: Joi.string().required().email()
      .error(errors.email),
    password: Joi.string().required().min(8)
      .regex(/[a-z0-9-+_=&?!.,%^:;<>#@*()~'"|\\/]{8,24}/i)
      .error(errors.password),
  }),
});


const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errors.login),
    password: Joi.string().required().min(8)
      .error(errors.login),
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
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
      .error(errors.avatar),
  }),
});


const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errors.name),
    link: Joi.string().required()
      .regex(/^(https?):\/\/(w{3}\.)?(?!www)(([А-ЯЁа-яёA-Za-z0-9_-]+\.[А-ЯЁа-яёA-Za-z0-9_-]+(\.[А-ЯЁа-яёA-Za-z_-]+){0,2})|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:\d{2,5})?(\/[A-Za-z0-9/\-_.#:?&~/=]*)?$/)
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
