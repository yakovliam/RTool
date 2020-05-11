const express = require('express');
const router = express.Router();

// client model
const Client = require('../../model/Client');

router.get('/update', isAuthenticated, async function (req, res, next) {
    const client = res.locals.client;

    // if nonexistent client (how..??)
    if (!client) return deny(req, res);

    // return queued messages, then remove those messages from the client object
    const queuedMessages = client.queuedMessages;

    // remove those queued messages from actual db and save
    await Client.update({_id: client._id, clientId: client.clientId}, {
        queuedMessages: []
    });
    // clear client var
    res.locals.client = undefined;

    return res.send({response: queuedMessages});
});

async function isAuthenticated(req, res, next) {

    /* GET CLIENT ID AND TOKEN */
    const clientId = req.body.clientId;
    const clientToken = req.body.clientToken;

    if (!clientId || !clientToken) return deny(req, res);

    // query database for clientId
    const client = await Client.findOne({clientId: clientId});

    if (!client) return deny(req, res);

    // check to see if token matches
    if (client.clientToken !== clientToken) return deny(req, res);

    // set client
    res.locals.client = client;
    // we're authenticated, so keep going
    return next();
}

function deny(req, res) {
    res.status(403).send({response: "Access Denied."});
}

module.exports = router;
