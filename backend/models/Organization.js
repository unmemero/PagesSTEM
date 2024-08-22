const mongoose = require('mongoose');
const { events } = require('./Internship');

const OrganizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    meetings: {
        type: [String],
        required: false,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    website: {
        type: String,
        required: true,
    },
    majors: {
        type: [String],
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    socialLinks: {
        type: [String],
        required: false,
    },
    events: {
        type: [
            {
                title: String,
                description: String,
                date: Date,
                time: String,
                location: String,
                link: String,
            }
        ],
        required: false,
    },
    uploader: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Organization', OrganizationSchema);