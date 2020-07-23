const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: string
    },
    location: {
        type: string
    },
    service: {
        type: [String],
        required: true
    },
    email: {
        type: string
    },
    social: {
        youtube: {
            type: string
        },
        twitter: {
            type: string
        },
        instagram: {
            type: string
        },
        facebook: {
            type: string
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);