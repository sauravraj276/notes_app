const express = require("express");
const router = express.Router();

const Note = require("./../models/Note");

router.post("/",async function (req, res) {
  const response = await Note.find();
  console.log(response);
  res.json(response);
});

router.post("/list", async function (req, res) {
  var notes = await Note.find({ userid: req.body.userid });
  console.log(notes);
  res.json(notes);
});

router.post("/add", async function (req, res) {
  await Note.deleteOne({ id: req.body.id });

  const newNote = new Note({
    id: req.body.id,
    userid: req.body.userid,
    title: req.body.title,
    content: req.body.content,
  });
  await newNote.save();

  const response = { message: "New Note Created" + `id:${req.body.id}` };
  console.log(response);
  res.json(response);
});

router.post("/delete", async function (req, res) {
  await Note.deleteOne({ id: req.body.id });
  const response = { message: "Note Deleted!" + `id:${req.body.id}` };
  console.log(response);
  res.json(response);
});

module.exports = router;
