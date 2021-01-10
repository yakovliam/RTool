const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// models
const User = require('../../../model/user');
const Client = require('../../../model/client');

router.post('/', async (req, res) => {
    return deny(req, res, "Access Denied.");
});

/**
 * Create a client
 */
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
        creatorId: user._id
    });

    // if didn't work, oops
    if (!client) return badRequest(req, res, "There was an error while creating the new client");

    // finished! Tell em it was all good
    res.status(200).send({response: "Created"});
});

/**
 * Delete a client
 */
router.post('/delete', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const clientId = req.body.clientId;

    // if one of them isn't preset, badRequest it
    if (!clientId) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, creatorId: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client with either that handle or clientId does not exist exists");

    // create new object
    await Client.findByIdAndDelete(existingClient._id);

    // finished! Tell em it was all good
    res.status(200).send({response: "Deleted"});
});

/**
 * Queue a command to be sent to a client
 */
router.post('/queue', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const handle = req.body.handle;
    const clientId = req.body.clientId;

    // if one of them isn't preset, badRequest it
    if (!clientId || !handle) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, handle: handle, creatorId: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client that you own with that clientId does not exist");

    // get message
    const message = req.body.message;

    if (!message) return badRequest(req, res, "You have not provided a message");

    //TODO send message through sockets

    // finished! Tell em it was all good
    res.status(200).send({response: {result: "Queued new message", message: message}});
});

/**
 * Get a client's data
 */
router.post('/get', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const clientId = req.body.clientId;

    // if one of them isn't preset, badRequest it
    if (!clientId) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, creatorId: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client that you own with that clientId does not exist");

    // finished! Tell em it was all good
    res.status(200).send({response: {client: existingClient}});
});

/**
 * Update a client's data
 */
router.post('/update', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get handle and other info
    const clientId = req.body.clientId;
    const handle = req.body.handle;
    const clientToken = req.body.clientToken;

    // if one of them isn't preset, badRequest it
    if (!clientId || !handle || !clientToken) return badRequest(req, res, "Invalid parameters");

    // make sure one exists with that id
    const existingClient = await Client.findOne(
        {clientId: clientId, creatorId: user._id}
    );

    if (!existingClient) return badRequest(req, res, "A client that you own with that clientId does not exist");

    // modify by setting its fields and then save (don't allow changing of clientId...that's static)
    existingClient.clientToken = clientToken;
    existingClient.handle = handle;

    await existingClient.save();

    // finished! Tell em it was all good
    res.status(200).send({response: {client: existingClient}});
});

/**
 * Get a list of clients
 */
router.post('/query', verifyToken, async (req, res, next) => {
    const user = req.user;

    if (!user) return badRequest(req, res, "An error has occurred! We could not retrieve your profile");

    // get required variables
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // if one of them isn't preset, badRequest it
    if (limit === null || page === null) {
        return badRequest(req, res, "Invalid parameters");
    }

    // if the page or limit is less than or equal to 0
    if (page <= 0 || limit <= 0) {
        return badRequest(req, res, "Invalid parameters");
    }

    // paginate / find results
    const clients = await Client.paginate({creatorId: user._id}, {page: page, limit: limit});

    if (!clients) return badRequest(req, res, "We could not find any clients that you own!");

    // finished! Tell em it was all good
    res.status(200).send({response: {clients: clients}});
});

/**
 * Verify a token
 * @param req the request
 * @param res the response
 * @param next the {next} function
 * @returns {Promise<void>}
 */
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

/**
 * Utility functions
 */

// Bad request
const badRequest = async (req, res, message) => {
    res.status(400).send({response: message});
};

// Deny access
const deny = async (req, res, message) => {
    res.status(403).send({response: message});
};


module.exports = router;