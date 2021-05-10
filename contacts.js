const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.warn(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find((el) => el.id == contactId);
  } catch (err) {
    console.warn(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newData = data.filter((el) => el.id != contactId);
    if (data.length === newData.length) return false;
    fs.writeFile(contactsPath, JSON.stringify(newData), "utf-8");
    return true;
  } catch (err) {
    console.warn(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    if (
      typeof name === "string" &&
      typeof email === "string" &&
      typeof phone === "string" &&
      name.length &&
      email.length &&
      phone.length
    ) {
      const index =
        data.sort((a, b) => a.id - b.id).findIndex((el, i) => el.id !== i + 1) +
        1;
      id = index === 0 ? data.length + 1 : index;
      const newContact = { id, name, email, phone };
      data.splice(id - 1, 0, newContact);
      fs.writeFile(contactsPath, JSON.stringify(data), "utf-8");
      return true;
    }
    return false;
  } catch (err) {
    console.warn(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
