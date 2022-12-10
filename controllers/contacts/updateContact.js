const Contact = require("../../models/contacts/index");

const { createError } = require("../../helpers/createError");

async function updateContact(req, res) {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.status(200).send(result);
}

module.exports = updateContact;
