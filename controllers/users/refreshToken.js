const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../../helpers/createError");
const User = require("../../models/users");

const { JWT_SECRET_KEY } = process.env;

async function refreshToken(req, res) {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError({ status: 401, message: "Email or password is wrong" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!user.verify) {
    throw createError({
      status: 401,
      message: "User not verified. Please verify you email",
    });
  }

  if (!passwordCompare) {
    throw createError({ status: 401, message: "Email or password is wrong" });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });

  await User.findByIdAndUpdate(user.id, { token });

  res.json({ token });
}
module.exports = refreshToken;
