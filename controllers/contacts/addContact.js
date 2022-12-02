const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/createError");
const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/, "(123) 456-7890")
    .required(),
});

async function addContact(req, res, next) {
  try {
    const body = req.body;

    const { error } = addContactsSchema.validate(body);

    if (error) {
      throw createError({ status: 400, message: error.message });
    }

    const result = await contacts.addContact(body);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = addContact;
