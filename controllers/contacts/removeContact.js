const Contact = require("../../models/contacts/index");
const { createError } = require("../../helpers/createError");

async function removeContact(req, res) {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
}

module.exports = removeContact;
