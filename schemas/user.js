const Joi = require("Joi");
const emailRegexp = require("../helpers/validateEmail");

const registerUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const resendVerificationEmail = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  resendVerificationEmail,
};
