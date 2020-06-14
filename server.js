//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const data = require("./db/db.json");
const Store = require("./db/store");

//Express
var app = express();
var PORT = process.env.PORT || 3000;

//Express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API Routes
app.get("/api/notes", function (req, res) {
  res.json(data);
});


app.post("/api/notes", function (req, res) {
  var id = data.length + 1;
  var newNote = req.body;
  newNote.id = id;
  data.push(req.body);
  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
    }
  );
  console.log("Note has been successfully saved!");
  res.json(data);
});

app.delete("/api/notes/:id", function (req, res) {

  const newData = data.filter((item) => {
  
    return item.id !== parseInt(req.params.id);
  });

  console.log(newData.length);
  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(newData),
    function (err) {
      if (err) throw err;
      console.log("Note has been successfully deleted!");
    }
  );
  res.json(data);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
