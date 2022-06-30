const express = require("express");
const subjectSchema = require("../models/subjectModel");
const router = express.Router();

// Create Subject
router.post("/subject", (req, res) => {
    const subject = userSchema(req.body);
    subject.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Get All Subjects
router.get("/subjects", (req, res) => {
    subjectSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});


// Get Subject by Id
router.get("/subject/:id", (req, res) => {
    const { id } = req.params;
    subjectSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Get Subject by Name
router.get("/subject/:name", (req, res) => {
    const { name } = req.params;
    subjectSchema
    .findOne({ _name: name })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Update a subject
router.put("/subject/:id", (req, res) => {
    const { id } = req.params;
    const { name, teacher, year, examDate, schedule } = req.body;
    subjectSchema
    .updateOne({ _id: id }, { $set: {name, teacher, year, examDate, schedule} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Delete a subject
router.delete("/subject/:id", (req, res) => {
    const { id } = req.params;
    subjectSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

module.exports = router;