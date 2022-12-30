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
        name: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    postTime: {
        type: Date,
        required: false
    },
    accountId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema);