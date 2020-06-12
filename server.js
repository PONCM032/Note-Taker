//Dependencies
const express = require("express");
const path = require("path");
const db = require("./db/db.json");
//Express
var app = express();
var PORT = process.env.PORT || 3000;

//Express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.get("/", function (req, res) {
  console.log("route check");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API Routes
app.get("/api/notes", function (request, response) {
  response.json(db)
  //---------------------
  response.readFile(db, "utf8")
    .then(function(note){
        response.json(note);
    });
});

app.post("/api/notes", function (request, response) {
  db.push(request.body);
  response.json(db);
});

app.delete("/api/notes/:id", function (request, response) {
//sets ID# per note
    db.forEach((item, i) => {
        request.params.id = i + 1;
        console.log('Note ID: ', request.params.id)
    }).then(function(){
        console.log("TEST");
    })
});

// ROUTES
// API
// '/api/notes'
// DELETE delete a note
// receive ID parameter
// compare it with the IDs in db.json
// match the ID and delete that note


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
