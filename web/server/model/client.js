const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

let ClientSchema = new mongoose.Schema({
    // the identifier / handle of the client
    handle: {
        type: String,
        required: true,
        min: 3
    },
    // the user who created the client
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    // the id of the client
    clientId: {
        type: String,
        required: true,
        min: 3,
        max: 2048
    },
    // the token of the client
    clientToken: {
        type: String,
        required: true,
        min: 3,
        max: 4096
    },
    // the date it was created
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
});

// set up pagination
ClientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Client", ClientSchema);