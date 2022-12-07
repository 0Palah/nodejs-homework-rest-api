const Contact = require("../../models/contacts/index");

async function addContact(req, res) {
  const result = await Contact.create(req.body);

  res.status(201).send(result);
}

module.exports = addContact;
