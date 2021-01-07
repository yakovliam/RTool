const express = require('express');
const router = express.Router();

// models
const Client = require('../../model/client');
const Message = require('../../model/message');

router.post('/update', isAuthenticated, async function (req, res, next) {
    const client = res.locals.client;

    // if nonexistent client (how..??)
    if (!client) return deny(req, res);

    // search for a [ still queued, clientId, creator ] --- ALSO FIND IT BY MOST RECENT
    const message = await Message.find({
        creator: client.creator,
        queued: true,
        clientId: client.clientId
    }).sort({dateSent: -1});

    // if nonexistent, return
    if (!message) return badRequest(req, res, "No messages");

    // received message, so now update with date, and set queued to false because it was received
    await Message.updateOne(
        {_id: message._id},
        {$set: {"dateReceived": new Date(), queued: false}}
    );

    // return message
    return res.send({response: message});
});

router.post('/respond', isAuthenticated, async function (req, res, next) {
    const client = res.locals.client;

    // if nonexistent client (how..??)
    if (!client) return deny(req, res);

    // get clientId
    const clientId = client.clientId;
    // get creator
    const creator = client.creator;

    // get message id
    const messageId = req.body.messageId;

    // get response
    const response = req.body.response;

    if (!messageId || !response) return badRequest(req, res, "Invalid parameters");

    // get response to message object
    const responseTo = await Message.findOne({
        messageId: messageId,
        creator: creator,
        clientId: clientId,
        response: undefined
    });

    // if nonexistent, return
    if (!responseTo) return badRequest(req, res, "No message to respond to");

    // set response and queued to false
    await Message.update(
        {_id: responseTo._id},
        {$set: {response: response}}
    );

    // send
    return res.send({response: "Responded"});
});

async function isAuthenticated(req, res, next) {

    /* GET CLIENT ID AND TOKEN */
    const clientId = req.body.clientId;
    const clientToken = req.body.clientToken;

    if (!clientId || !clientToken) return deny(req, res, "Invalid clientId or clientToken");

    // query database for clientId
    const client = await Client.findOne({clientId: clientId});

    if (!client) return deny(req, res, "Invalid clientId or clientToken");

    // check to see if token matches
    if (client.clientToken !== clientToken) return deny(req, res, "Invalid clientId or clientToken");

    // set client
    res.locals.client = client;
    // we're authenticated, so keep going
    return next();
}

// misc functions
const badRequest = async (req, res, message) => {
    res.status(400).send({response: message});
}
const deny = async (req, res, message) => {
    res.status(403).send({response: message});
}
module.exports = router;
