const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) {
        reject("Nie udało się odczytać pliku kontaktów.");
        return;
      }
      const contacts = JSON.parse(data);
      resolve(contacts);
    });
  });
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: String(contacts.length + 1), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
