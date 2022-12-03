const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/createError");

async function updateContact(req, res) {
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.status(200).send(result);
}

module.exports = updateContact;
