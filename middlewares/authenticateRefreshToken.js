const jwt = require("jsonwebtoken");
const { createError } = require("../helpers/createError");
const User = require("../models/users");

const { JWT_REFRESH_SECRET_KEY } = process.env;

async function authenticateRefreshToken(req, res, next) {
  try {
    // const { authorization } = req.headers;
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createError({ status: 401, message: "Not authorized" });
    }

    const { id } = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      throw createError({ status: 401, message: "Not authorized" });
    }
    req.user = user;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }

    next(error);
  }
}

module.exports = { authenticateRefreshToken };
