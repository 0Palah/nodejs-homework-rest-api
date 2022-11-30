const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { createError } = require("../../helpers/createError");

const router = express.Router();

const addContactsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})/, "(123) 456-7890")
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const { error } = addContactsSchema.validate(body);

    if (error) {
      res.status(400).json({ message: error.message });

      return;
    }

    const result = await contacts.addContact(body);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw createError({ status: 404, message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing fields" });

      return;
    }

    const { error } = addContactsSchema.validate(body);

    if (error) {
      res.status(400).json({ message: error.message });

      return;
    }

    const result = await contacts.updateContact(contactId, body);

    if (!result) {
      throw createError({ status: 404, message: "Not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
