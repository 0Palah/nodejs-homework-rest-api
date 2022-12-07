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

module.exports = router;
