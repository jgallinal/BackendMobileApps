const express = require("express");
const claimSchema = require("../models/claimModel");
const router = express.Router();

// Create Claim
router.post("/claim", (req, res) => {
    const claim = claimSchema(req.body);
    claim.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Get All Claims
router.get("/claims", (req, res) => {
    claimSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

// Delete a claim
router.delete("/claim/:id", (req, res) => {
    const { id } = req.params;
    claimSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

module.exports = router;