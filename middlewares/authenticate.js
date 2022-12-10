const { createError } = require("../helpers/createError");

async function authenticate(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError({ status: 401, message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}
