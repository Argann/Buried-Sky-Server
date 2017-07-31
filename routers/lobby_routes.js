/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 12:03
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: lobby_routes.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 17:59
 */

var logger = require('../utils/logger.js');
var config = require('config');

exports.name = "Lobby Router";

exports.register = (socket, io) => {

    socket.on('lobby-connection', function(){
        logger.debug("User "+socket._user.username+" ("+socket.id+") has joined lobby.");
        socket
            .to(config.get("Game.defaultLobbyRoomName"))
            .emit("s-message", {message: "[SERVER] User "+socket._user.username+" is now connected."});
        socket
            .emit("s-message", {message: "[SERVER] Welcome to Buried Sky."});
    });

};
