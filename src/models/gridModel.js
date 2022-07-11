const mongoose = require("mongoose");

const gridSchema = mongoose.Schema({
    plan: {
        type: String,
        required: true
    },
    carreer: {
        type: [String],
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Grid", gridSchema);