const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// models
const User = require('../../model/user');
const Client = require('../../model/client');
const Message = require('../../model/message');

router.post('/', async (req, res) => {
    return deny(req, res, "Access Denied.");
});

// create a new client to watch
router.post('/create', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const handle = req.body.handle;
    const clientId = req.body.clientId;
    const clientToken = req.body.clientToken;

    // if one of them isn't preset, badRequest it
    if (!handle || !clientId || !clientToken) return badRequest(req, res, "Invalid parameters");

    // make sure one didn't exist before with the same clientId OR handle
    const existingClient = await Client.findOne({
        $or: [
            {clientId: clientId},
            {handle: handle}
        ]
    });

    if (existingClient) return badRequest(req, res, "A client with either that handle or clientId already exists");

    // create new object
    const client = await Client.create({
        handle: handle,
        clientId: clientId,
        clientToken: clientToken,
        creator: user._id
    });

    // if didn't work, oops
    if (!client) return badRequest(req, res, "There was an error while creating the new client");

    // finished! Tell em it was all god
    res.status(200).send({response: "Created"});
});

// queue a command for a client
router.post('/queue', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const clientId = req.body.clientId;

    // if one of them isn't preset, badRequest it
    if (!clientId) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, creator: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client that you own with that clientId does not exist");

    // get message
    const messages = req.body.messages;

    if (!messages) return badRequest(req, res, "You have not provided a message");

    let messageObjects = [];

    // for each message, create a new message.js object
    for (let key in messages) {
        // create new "message" object
        messageObjects.push(await Message.create({creator: user._id, clientId: clientId, message: key}));
    }

    // finished! Tell em it was all god
    res.status(200).send({response: {result: "Queued new message", messages: [messageObjects]}});
});

// get the message to a command for a client
router.post('/getmessage', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const clientId = req.body.clientId;

    // if one of them isn't preset, badRequest it
    if (!clientId) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, creator: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client that you own with that clientId does not exist");

    // get message
    const messageId = req.body.messageId;

    if (!messageId) return badRequest(req, res, "Missing target messageId");

    // query db to find message with that Id (and clientId)
    const targetMessage = await Message.findOne({clientId: clientId, messageId: messageId});

    if (!targetMessage) return badRequest(req, res, "No message with that messageId and clientId found");

    // got the message, so let's just return the entire thing (because it has the data!)
    res.status(200).send({response: targetMessage});
});

// verify token
async function verifyToken(req, res, next) {

    // get JWT token for session
    const token = req.cookies.token;

    if (!token) {
        return deny(req, res, "Invalid token");
    }

    let userFromToken;

    try {
        userFromToken = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
        return deny(req, res, "Invalid token");
    }

    let user;

    try {
        user = await User.findOne({_id: userFromToken._id});

        if (!user)
            throw new Error('Invalid token was provided');

    } catch (e) {
        return deny(req, res, "Invalid token");
    }
    req.user = user;

    next();
}

// misc functions
const badRequest = async (req, res, message) => {
    res.status(400).send({response: message});
};
const deny = async (req, res, message) => {
    res.status(403).send({response: message});
};


module.exports = router;