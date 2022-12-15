async function getCurrentUser(req, res) {
  const { subscription, email } = req.user;

  res.json({
    email,
    subscription,
  });
}

module.exports = getCurrentUser;
