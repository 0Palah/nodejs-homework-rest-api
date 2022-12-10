async function getCurrentUser(req, res) {
  const { name, email } = req.user;

  res.jsone({ name, email });
}

module.exports = getCurrentUser;
