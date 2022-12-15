const Joi = require("joi");
const phoneRegexp = require("../helpers/validatePhone");

const addContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp, "(123) 456-7890").required(),
  favorite: Joi.boolean(),
});

const updateFavoriteByIdSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { addContactsSchema, updateFavoriteByIdSchema };
