const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
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
    preferredMajors: {
        type: [String],
        required: false,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
    },
    payType:{
        type: String,
        required: true,
    },
    payAmount: {
        type: Number,
        required: true,
    },
    payPeriod: {
        type: String,
        required: true,
    },
    applicationLink: {
        type: String,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Job', JobSchema);