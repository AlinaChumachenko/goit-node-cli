const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
// import { promises as fs } from "fs";
// import path from "path";
// import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");
// const folderPath = path.resolve("./db", "contacts.json");
// console.log(__dirname);
// console.log(__filename);

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const createContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(createContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return createContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
