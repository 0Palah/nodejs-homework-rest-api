const Joi = require("Joi");
const emailRegexp = require("../helpers/validateEmail");
const phoneRegexp = require("../helpers/validatePhone");

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp, "(123) 456-7890").required(),
  favorite: Joi.boolean(),
});

module.exports = { registerUserSchema };
