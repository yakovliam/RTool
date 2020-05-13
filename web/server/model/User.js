const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
        max: 2048
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 2048
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 4096
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
});

module.exports = mongoose.model("User", UserSchema);