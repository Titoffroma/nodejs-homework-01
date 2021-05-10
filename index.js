const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((contacts) => console.table(contacts));
      break;

    case "get":
      getContactById(id).then((data) => {
        if (data) console.table([data]);
        else console.warn(`No contacts found by given id: ${id}`);
      });
      break;

    case "add":
      addContact(name, email, phone).then((data) => {
        if (data) console.log("Successfully added");
        else console.warn(`No data was added. Check the entered data.`);
      });
      break;

    case "remove":
      removeContact(id).then((data) => {
        if (data) console.log("Successfully removed");
        else console.warn(`No data was removed. Check the entered data.`);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
