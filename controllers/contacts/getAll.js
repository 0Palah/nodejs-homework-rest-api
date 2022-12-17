const Contact = require("../../models/contacts/index");

async function getAll(req, res) {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const searchParams = {
    owner: _id,
  };

  if (favorite === "true") {
    searchParams.favorite = favorite;
  }

  if (favorite === "false") {
    searchParams.favorite = favorite;
  }

  const result = await Contact.find(searchParams, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(result);
}

module.exports = getAll;
