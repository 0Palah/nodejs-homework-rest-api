const Contact = require("../../models/contacts/index");

// const contacts = require("../../models/contacts");

async function addContact(req, res) {
  // const result = await contacts.addContact(req.body);
  const result = await Contact.create(req.body);

  res.status(201).send(result);
}

module.exports = addContact;
