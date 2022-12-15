const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.get(
  "/",
  middlewares.authenticate,
  controllerWrapper(controllers.getAll)
);

router.get(
  "/:contactId",
  middlewares.authenticate,
  controllerWrapper(controllers.getById)
);

router.post(
  "/",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.addContact)
);

router.delete(
  "/:contactId",
  middlewares.authenticate,
  controllerWrapper(controllers.removeContact)
);

router.put(
  "/:contactId",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.updateFavoriteByIdSchema),
  controllerWrapper(controllers.updateFavoriteById)
);

module.exports = router;
