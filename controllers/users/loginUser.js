const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../../helpers/createError");
const User = require("../../models/users");

const { JWT_SECRET_KEY } = process.env;

async function loginUser(req, res) {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError({ status: 401, message: "Email or password is wrong" });
  }

  const passwordCopare = await bcrypt.compare(password, user.password);

  if (!passwordCopare) {
    throw createError({ status: 401, message: "Email or password is wrong" });
  }
  res.json({ token: "srgsrgsrgsrgsrgsrgsrgsrgsrgqrgsg" });
}
module.exports = loginUser;
