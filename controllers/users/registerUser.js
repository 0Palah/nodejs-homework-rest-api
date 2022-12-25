const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");
const { createError } = require("../../helpers/createError");
const User = require("../../models/users");
const sendSgEmail = require("../../helpers/sendSgEmail");

const { BASE_URL } = process.env;

async function registerUser(req, res) {
  const { password, email, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError({ status: 409, message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { protocol: "https" });

  const verificationToken = randomUUID();

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const message = {
    to: email,
    subject: "Email verification",
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendSgEmail(message);

  res.status(201).json({
    email: result.email,
    password: result.password,
    subscription: result.subscription,
  });
}

module.exports = registerUser;


