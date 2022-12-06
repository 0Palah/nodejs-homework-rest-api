const Contact = require("../../models/contacts/index");

const { createError } = require("../../helpers/createError");

async function updateFavoriteById(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log(favorite);

  const result = await Contact.findByIdAndUpdate(
    contactId,
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
