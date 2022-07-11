const express = require("express");
const userSchema = require("../models/userModel");
const router = express.Router();

// Create User
router.post("/user", (req, res) => {
    const user = userSchema(req.body);
    user.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Get All Users
router.get("/users", (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});


// Get User By Id
router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Get User by Mail
router.get("/userByMail/:mail", (req, res) => {
    const { mail } = req.params;
    userSchema
    .findOne({ _mail: mail })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Update a user
router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, isStudent, subjects } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: {firstName, lastName, isStudent, subjects} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Delete a user
router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

router.get('/hola', (req,res) =>{
    console.log("Yes");
});

module.exports = router;