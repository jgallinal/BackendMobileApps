const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: [String],
        required: true
    },
    career: {
        type: [String],
        required: true,
    },
    year: {
        type: [String],
        required: false
    },
    examDate:{
        type: [String],
        required: false
    },
    schedule: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model("Subject", subjectSchema);