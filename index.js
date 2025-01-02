const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.error("Błąd podczas pobierania kontaktów:", error);
      }
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("Szczegóły kontaktu:", contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(`Dodano nowy kontakt: ${name}`);
      break;

    case "remove":
      await removeContact(id);
      console.log(`Kontakt o ID ${id} został usunięty`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
