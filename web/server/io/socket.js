const Client = require('../model/client');


class SocketManager {
    clients = new Map();
}

let socketManager = new SocketManager();

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
        socket.on('connect credentials', async (msg) => {
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
    });

    return socketManager;
}