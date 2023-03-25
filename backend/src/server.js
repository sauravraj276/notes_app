const express = require("express");

const app = express();
const mongoose = require("mongoose");

const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  const response = { message: "API WORKS" };
  res.json(response);
});

mongoose
  .connect(
    "mongodb+srv://sauravraj276:Er1CGB48ziD3zur4@mumbaiaws.jfaccfz.mongodb.net/notesdb"
  )
  .then(() => {
    
  console.log("Successfully connected to database");
    // app.get("/", function (req, res) {
    //   const response = { message: "API WORKS" };
    //   res.json(response);
    // });
    
    const noteRouter = require('./routes/Note')
    app.use("/notes", noteRouter)
  }).catch ((error)=> {
    console.error(error)});


  const PORT=process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("server started at PORT : "+PORT);
});
