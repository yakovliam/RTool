const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    // the identifier / handle of the client
    creator: {
        type: String,
        required: true,
        min: 3
    },
    // whether or not the message is queued. Becomes false when a response comes in
    queued: {
        type: Boolean,
        required: true,
        default: true
    },
    // the id of the client
    clientId: {
        type: String,
        required: true,
        min: 3,
        max: 2048
    },
    // the id of the message (random)
    messageId: {
        type: String,
        required: true,
        default: uuidv4()
    },
    // the message that was sent
    message: {
        type: String,
        required: true
    },
    // the response that was received
    response: {
        type: Object
    },
    // the date at which the message was sent
    dateSent: {
        type: Date,
        required: true,
        default: new Date()
    },
    // the date at which the message was received
    dateReceived: {
        type: Date
    },
    // the date the response came in
    dateResponded: {
        type: Date
    }
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = mongoose.model("Message", MessageSchema);