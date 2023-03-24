const express = require("express");

const app = express();
const mongoose = require("mongoose");

const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://sauravraj276:Er1CGB48ziD3zur4@mumbaiaws.jfaccfz.mongodb.net/notesdb"
  )
  .then(() => {
    router.get("/", function (req, res) {
      const response = { message: "API WORKS" };
      res.json(response);
    });
    
    const noteRouter = require('./routes/Note')
    app.use("/notes", noteRouter)
  });
app.listen(5000, function () {
  console.log("server started at PORT : 5000");
});
