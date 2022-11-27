const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        comment: {
            type: Object,
            required: true
        },
        accountId: {
            type: String,
            required: true
        }
    }],
    postTime: {
        type: Date,
        required: false,
        default: Date.now()
    },
    accountId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);