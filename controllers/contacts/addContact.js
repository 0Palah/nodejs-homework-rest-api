const Contact = require("../../models/contacts/index");

async function addContact(req, res) {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;

  const result = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });

  res.status(201).send(result);
}

module.exports = addContact;
