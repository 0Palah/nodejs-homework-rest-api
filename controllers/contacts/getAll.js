const contacts = require("../../models/contacts");

async function getAll(req, res) {
  const result = await contacts.listContacts();

  res.json(result);
}

module.exports = getAll;
