const Contact = require("../../models/contacts/index");

async function getAll(req, res) {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = true } = req.query;

  const skip = (page - 1) * limit;

  console.log(req.query);

  const result = await Contact.find(
    { owner: _id, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email");

  res.json(result);
}

module.exports = getAll;
