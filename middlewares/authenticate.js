async function authenticate(req, res, next) {
  try {
    const { authorization } = req.headers;
  } catch (error) {
    console.error(error);
    next(error);
  }
}
