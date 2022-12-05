const Contact = require("../../models/contacts/index");

// const contacts = require("../../models/contacts");

async function getAll(req, res) {
  // const result = await contacts.listContacts();
  const result = await Contact.find({});

  res.json(result);
}

module.exports = getAll;
