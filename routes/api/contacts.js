const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:contactId", controllerWrapper(controllers.getById));

router.post(
  "/",
  middlewares.authenticate,
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.addContact)
);

router.delete("/:contactId", controllerWrapper(controllers.removeContact));

router.put(
  "/:contactId",
  middlewares.validateBody(schemas.contact.addContactsSchema),
  controllerWrapper(controllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  middlewares.validateBody(schemas.contact.updateFavoriteByIdSchema),
  controllerWrapper(controllers.updateFavoriteById)
);

module.exports = router;
