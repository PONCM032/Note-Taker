const db = require("./db.json");
const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  }

  getNote() {
    this.read().then(function (notes) {
      let parseNotes = [];
      try {
        parseNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        console.log("Did not save successfully");
        parseNotes = [];
      }
      return parseNotes;
    });
  }

  addNote(notes) {
    let { title, text } = notes;

    if (!title || !text) {
      throw new Error("addNote not saving");
    }
    let newNote = { title, text, id: id++};
    return this.getNote()
      .then((notes) => [...notes, newNote])
      .then((updateNotes) => this.write(updateNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNote()
      .then((db) => db.filter((db) => db.id != id))
      .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Store()
