const Contact = require("../../models/contacts/index");

const { createError } = require("../../helpers/createError");

async function updateContact(req, res) {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.status(200).send(result);
}

module.exports = updateContact;
