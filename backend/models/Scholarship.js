const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    majors: {
        type: [String],
        required: true,
    },
    locations: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
    },
    awardAmmount: {
        type: Number,
        required: true,
    },
    applicationLink: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);