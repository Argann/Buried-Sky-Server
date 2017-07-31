/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 12:03
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: chat_routes.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 12:12
 */


var config = require('config');

exports.name = "Chat Router";

exports.register = (socket, io) => {

    socket.on('c-message', function(data){
        message = JSON.parse(data);
        s = message.message;
        s = "[" + socket._user.username + "] " + s;
        io.sockets
            .in(config.get("Game.defaultLobbyRoomName"))
            .emit("s-message", {message: s});
    });

};
