const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true,
        min: 3,
        max: 2048
    },
    clientToken: {
        type: String,
        required: true,
        min: 3,
        max: 4096
    },
    queuedMessages: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Client", ClientSchema);