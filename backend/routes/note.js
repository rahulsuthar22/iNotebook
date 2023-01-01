const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route:1 Fetch all the notes using: /api/note/fetchallnote  , Login Required
router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const notes = await Note.find({ user: userId });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Route:2 Add note using /api/note/addnote , Login required
router.post("/addnote", fetchuser, [body("title", "Enter the valid title").isLength({ min: 3 }), body("description", "Enter the valid description").isLength({ min: 5 })], async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ error: error.array() });
    }
    const { title, description, tag } = req.body;
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Route:3 Update a note using /api/note/updatenote/:id, login required
router.put("/updatenote/:id", fetchuser, [body("title", "Enter the valid title").isLength({ min: 3 }), body("description", "Enter the valid description").isLength({ min: 5 })], async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ error: error.array() });
    }
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Finding the note by its id
    // console.log(req.params.id);
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Validating the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Updating the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

//Route:4 Deleting a note using /api/note/deletenote/:id, login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Finding the note by its id
    // console.log(req.params.id);
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Validating the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Updating the note
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
