const express = require("express");

const app = express();
const mongoose = require("mongoose");

const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
app.use(express.static('public'))


// app.get("/", function (req, res) {
//   const response = { message: "API WORKS" };
//   res.json(response);
// });
const PORT = process.env.PORT || 5000;
MONGO_URI =
  "mongodb+srv://sauravraj276:Er1CGB48ziD3zur4@mumbaiaws.jfaccfz.mongodb.net/notesdb" ||
  process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Routes go here


// app.get("/", function (req, res) {
//   const response = { message: "API WORKS" };
//   res.json(response);
// });

const noteRouter = require("./routes/Note");
app.use("/notes", noteRouter);

app.all("*", (req, res) => {
  res.json({
    Hello: "No routes are defined at this endpoint, but its working",
  });
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, function () {
    console.log("server started at PORT : " + PORT);
  });
});


