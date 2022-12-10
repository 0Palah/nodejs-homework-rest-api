const Contact = require("../../models/contacts/index");

const { createError } = require("../../helpers/createError");

async function getById(req, res) {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.find({ _id: contactId, owner: _id });

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.json(result);
}

module.exports = getById;
