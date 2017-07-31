/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 11:28
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: basic_routes.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 13:20
 */

/*
    This router set all the basic listeners.
*/

// --- Requires ---
var config = require('config');
var logger = require('../utils/logger.js');

// --- Router Name ---
exports.name = "Basic Router";

// --- Router Register ---
exports.register = (socket, io) => {

    /*
    This is the basic Handshake listener.
    It was created to check if the Socket.io client/server connection works.
    */
    socket.on('hi', function(){
        logger.debug("User "+socket._user.username+" ("+socket.id+") says Hi !");
    });

    /*
    This is the listener called when an user is disconnected.
    */
    socket.on('disconnect', function(){ // What happens when someone disconnect ?
        logger.debug("User "+socket._user.username+" ("+socket.id+") is now disconnected.");
        if(socket._inLobby){
            io.sockets
                .in(config.get("Game.defaultLobbyRoomName"))
                .emit("s-message", {message: "[SERVER] User "+socket._user.username+" leave."});
        }
    });


};
