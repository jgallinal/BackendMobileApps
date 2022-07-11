const express = require("express");
const gridSchema = require("../models/gridModel");
const router = express.Router();

// Get grilla by Plan and Carreer
router.get("/grid/:plan/:carreer", (req,res) => {
    const { plan } = req.params.plan;
    const { carreer } = req.params.carreer;
    gridSchema
    .find( {plan: plan, carreer: carreer})
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

router.post("/newGrid", (req, res) => {
    const grid = gridSchema(req.body);
    grid.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message : error}));
});

module.exports = router;