const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");

// const contacts = require("../../models/contacts.json");

const router = express.Router();

const addContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  // res.json({ message: "template message" });
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  // res.json({ message: "template message" });

  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.json(result);
});

router.post("/", async (req, res, next) => {
  const { error } = addContactsSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });

    return;
  }
  // res.json({ message: "template message" });
  // const { name, email, phone } = req.body;
  const body = req.body;

  const result = await contacts.addContact(body);
  res.status(201).send(result);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
