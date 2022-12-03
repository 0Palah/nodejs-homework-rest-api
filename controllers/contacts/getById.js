const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/createError");

async function getById(req, res) {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.json(result);
}

module.exports = getById;
