const Client = require('../model/client');
const fs = require('fs');

class SocketManager {
    clients = new Map();
}

let socketManager = new SocketManager();

let verifySocketMessage = function (socket) {
    const exists = socketManager.clients.get(socket.id).clientObject;
    if (!exists) {
        console.log("User with id '" + socket.id + "' has failed the verification test and will be disconnected");
        // disconnect socket
        socket.disconnect();
    }

    // return
    return exists;
}

module.exports = function (io) {

    // connection
    io.on('connection', function (socket) {

        // add client to map
        socketManager.clients.set(socket.id, {socket: socket, clientObject: null});

        console.log("User with id '" + socket.id + "' has connected");

        // disconnect
        socket.on('disconnect', () => {
            // remove client from map
            socketManager.clients.delete(socket.id);

            console.log("User with id '" + socket.id + "' disconnected");
        });

        // chat message
        socket.on('connect credentials', async function (msg) {
            const credentials = msg;
            const clientId = credentials.clientId;
            const clientToken = credentials.clientToken;

            console.log("User with id '" + socket.id + "' sent credentials -> clientId: " + clientId + ", clientToken: " + clientToken);

            // search for credentials in database
            const client = await Client.findOne({"clientId": clientId, "clientToken": clientToken});

            // if no client, send message back
            if (!client) {
                socket.emit("response", {
                    "error": true,
                    "message": "Invalid id or token"
                });

                // disconnect socket
                socket.disconnect();
            } else {
                socket.emit("response", {
                    "error": false,
                    "message": "Success"
                });

                // set object in map
                socketManager.clients.set(socket.id, {socket: socket, clientObject: client});
            }
        });

        // screencap
        socket.on('screencap', function (msg) {
            if (!verifySocketMessage(socket)) return;

            console.log("User with id '" + socket.id + " sent a screen-capture");

            const screencap = msg.data;
            const client = socketManager.clients.get(socket.id).clientObject;

            const dir = "./media/" + client.clientId + "/";

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            fs.writeFile(dir + "screencap.jpg", screencap, 'base64', function (err) {
                if (err)
                    console.log("Error writing screen-capture file: " + err);
            });

        })
    });

    return socketManager;
}