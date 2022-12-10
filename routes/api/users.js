const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/users");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.post(
  "/register",
  middlewares.validateBody(schemas.user.registerUserSchema),
  controllerWrapper(controllers.registerUser)
);

router.get(
  "/login",
  middlewares.validateBody(schemas.user.loginUserSchema),
  controllerWrapper(controllers.loginUser)
);

router.get(
  "/current",
  middlewares.authenticate,
  controllerWrapper(controllers.getCurrentUser)
);

module.exports = router;
