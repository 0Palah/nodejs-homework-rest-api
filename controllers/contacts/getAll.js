const contacts = require("../../models/contacts");

async function getAll(req, res, next) {
  try {
    const result = await contacts.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;
