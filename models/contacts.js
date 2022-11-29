// const fs = require('fs/promises')
const contacts = require("./contacts.json");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = contacts;
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((el) => el.id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {};

// -----

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  console.log(newContact);
};

// -----

async function updateContacts(newContact) {
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;

  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, name, email, phone };

  await updateContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
