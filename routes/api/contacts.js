const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts");

// const Joi = require("joi");
// const { createError } = require("../../helpers/createError");
// const contacts = require("../../models/contacts");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put("/:contactId", controllers.updateContact);

module.exports = router;
