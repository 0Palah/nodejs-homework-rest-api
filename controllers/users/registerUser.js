const User = require("../../models/users");

async function registerUser(req, res) {
  const { password, email, subscription } = req.body;

  const result = await User.create({ password, email, subscription });
  res.status(201).json({
    email: result.email,
    password: result.password,
    subscription: result.subscription,
  });
}

module.exports = registerUser;
