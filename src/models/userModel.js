const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: false
    },

    mail: {
        type: String,
        required:true
    },

    isStudent: {
        type: Boolean,
        required: true
    },

    subjects: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model("User", userSchema);

