/**
 * @Author: Argann BONNEAU <AlphaDreams>
 * @Date:   09-07-2017 19:50
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: index.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 12:39
 */

// --- Requirements ---
const express = require("express");         // Express is used by Socket.io
const app = express();                      // Meh, it's express.
var server = require('http').Server(app);   // The server used to listening
var io = require('socket.io')(server);      // Socket.io
var config = require('config');             // Config stores var in config file

// --- Custom libs ---
var user = require('./model/user.js');      // The model for an User
var router = require('./routers/router.js');// The main router, register any other routers.

// --- Constants ---
const PORT = config.get("Server.port");     // The listening port for the server

// --- App ---
server.listen(PORT);    // The server now listen to the port defined up there.

io.on('connection', function(socket){ // When someone try to connect to the server...

    console.log("There is someone here !"); // Log, for debug.
    socket._user = user.create();           // We create a new user
    socket._inLobby = false;                // Also, we store that the user is not yet in the lobby
    socket._inGame = false;                 // And that he's not yet in game.

    router.register(socket, io);            // And finally, we register every routes for his socket.
});

// --- After All ---
console.log(`\nRunning on http://localhost:${PORT}`);
