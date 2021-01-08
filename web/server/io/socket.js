const sanitize = require('mongo-sanitize');
const Client = require('../model/user');

let clients = new Map();

module.exports = function (io) {

    // connection
    io.on('connection', function (socket) {
        // add client to map
        clients.set(socket.id, socket);

        console.log("User with id '" + socket.id + "' has connected");

        // disconnect
        socket.on('disconnect', () => {
            // remove client from map
            clients.delete(socket.id);

            console.log("User with id '" + socket.id + "' disconnected");
        });

        // chat message
        socket.on('connect credentials', async (msg) => {
            const credentials = msg;
            const clientId = sanitize(credentials.clientId);
            const clientToken = sanitize(credentials.clientToken);

            console.log("User with id '" + socket.id + "' sent credentials -> clientId: " + clientId + ", clientToken: " + clientToken);

            // search for credentials in database
            const client = await Client.findOne({clientId: clientId, clientToken: clientToken});

            // if no client, send message back
            if (client == null) {
                socket.emit("response", {
                    "error": true,
                    "message": "Invalid id or token"
                });

                // disconnect socket
                socket.disconnect();
            }
        });
    });
}