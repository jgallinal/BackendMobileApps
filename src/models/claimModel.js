const mongoose = require("mongoose");

const claimSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Claim", claimSchema);