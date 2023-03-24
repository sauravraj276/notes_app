const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sauravraj276:Er1CGB48ziD3zur4@mumbaiaws.jfaccfz.mongodb.net/notesdb"
  )
  .then(() => {
    app.get("/", function (req, res) {
      res.send("This is the home page");
    });
  });
app.listen(5000, function () {
  console.log("server started at PORT : 5000");
});
