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

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    const contacts = JSON.parse(data);

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      (err) => {
        if (err) {
          console.error("Błąd zapisu pliku:", err);
          return;
        }
        console.log("Kontakt został usunięty");
      }
    );
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    const contacts = JSON.parse(data);

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Błąd zapisu pliku:", err);
        return;
      }
      console.log("Kontakt został dodany");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
