const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: false
    },
    studentAccount: {
        type: Boolean,
        required: true,
        default: false
    }    
})

module.exports = mongoose.model('Account', accountSchema);