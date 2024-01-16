const contacts = require("./contacts");

import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const allContacts = await listContacts();
      return console.log(allContacts);
      break;

    case "get":
      // ... id
      const contactId = await getContactById(id);
      return console.log(contactId);
      break;

    case "add":
      // ... name email phone
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      // ... id
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
