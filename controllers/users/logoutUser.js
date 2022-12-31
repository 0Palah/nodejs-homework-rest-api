const User = require("../../models/users");

async function logoutUser(req, res) {
  const { _id } = req.user;

  // const { refreshToken } = req.cookies;
  // console.log(refreshToken);

  await User.updateOne({ _id }, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
}

module.exports = logoutUser;
