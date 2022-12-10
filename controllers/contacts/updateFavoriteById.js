const Contact = require("../../models/contacts/index");

const { createError } = require("../../helpers/createError");

async function updateFavoriteById(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    {
      new: true,
    }
  );

  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }

  res.status(200).send(result);
}

module.exports = updateFavoriteById;
