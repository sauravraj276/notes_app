const express = require("express");

const app = express();
const mongoose = require("mongoose");

const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.set("x-timestamp", Date.now());
  res.set("x-powered-by", "cyclic.sh");
  console.log(
    `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`
  );
  next();
});

var options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js", "ico", "jpg", "jpeg", "png", "svg"],
  index: ["index.html"],
  maxAge: "1m",
  redirect: false,
};
app.use(express.static("public", options));

const cors = require("cors");
app.use(cors());


// This configures static hosting for files in /public that have the extensions
// listed in the array.


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

// app.all("*", (req, res) => {
//   res.json({
//     Hello: "No routes are defined at this endpoint, but its working",
//   });
// });

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, function () {
    console.log("server started at PORT : " + PORT);
  });
});
