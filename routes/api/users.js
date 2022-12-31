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

router.post(
  "/logout",
  middlewares.authenticate,
  controllerWrapper(controllers.logoutUser)
);

router.patch(
  "/avatars",
  middlewares.authenticate,
  middlewares.upload.single("avatar"),
  controllerWrapper(controllers.updateAvatar)
);

router.post(
  "/verify",
  middlewares.authenticate,
  middlewares.validateBody(schemas.user.resendVerificationEmail),
  controllerWrapper(controllers.resendVerificationEmail)
);

router.get(
  "/refreshToken",
  middlewares.authenticateRefreshToken,
  controllerWrapper(controllers.refreshToken)
);

router.get("/verify/:verificationToken", controllerWrapper(controllers.verify));

module.exports = router;
