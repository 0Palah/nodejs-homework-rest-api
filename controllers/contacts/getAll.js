const Contact = require("../../models/contacts/index");

async function getAll(req, res) {
  const { _id } = req.user;

  const result = await Contact.find({ owner: _id }).populate("owner", "email");

  res.json(result);
}

module.exports = getAll;
