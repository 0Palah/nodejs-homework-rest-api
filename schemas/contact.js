const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/, "(123) 456-7890")
    .required(),
  favorite: Joi.boolean(),
});

module.exports = { addContactsSchema };
