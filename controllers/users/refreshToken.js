const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

const { createError } = require("../../helpers/createError");
const User = require("../../models/users");

const { JWT_SECRET_KEY } = process.env;
const { JWT_REFRESH_SECRET_KEY } = process.env;

async function refreshToken(req, res) {
  const { id } = req.user;

  const user = await User.findById({ id });

  if (!user) {
    throw createError({ status: 401, message: "Not authorized" });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "5m" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "10d",
  });

  await User.findByIdAndUpdate(user.id, { token, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    // httpOnly: true,
  });
  res.json({ token, refreshToken });
}

module.exports = refreshToken;
