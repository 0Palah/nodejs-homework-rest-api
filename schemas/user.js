const Joi = require("Joi");
const emailRegexp = require("../helpers/validateEmail");
const phoneRegexp = require("../helpers/validatePhone");

const registerUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp, "(123) 456-7890"),
  subscription: Joi.string(),
});

module.exports = { registerUserSchema };
