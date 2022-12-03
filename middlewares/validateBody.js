const { createError } = require("../helpers/createError");
const Joi = require("joi");

function validateBody(schema) {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw createError({ status: 400, message: error.message });
    }

    next();
  };

  return fn;
}

module.exports = { validateBody };
