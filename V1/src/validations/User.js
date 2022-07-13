const Joi = require('joi');

const createUser = Joi.object({
  full_name: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

const userLogin = Joi.object({
  email: Joi.string().email().required().min(8),
  password: Joi.string().required().min(8),
});

const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().min(6),
});

module.exports = {
  createUser,
  userLogin,
  resetPasswordValidation,
};
