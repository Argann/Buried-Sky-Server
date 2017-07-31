/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 12:08
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: router.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 12:46
 */

/*

    This module register every routers that we create.
    A router lists every routes that follow almost the same logic.

    For example, "chat_routes" will register every routes
    linked to the "chat" logic.

    Basically, a route is a message listener for a socket.
    See the docs of Socket.io for more information.

    If you want to create a new router:
        - Create a new module in this directory (or anywhere you need to store it)
        - Implement a `register` function that create the message listeners
        - Create a `name` var. It's used basically for logging.
        - Add a `require` in the "routers" list bellow, that link to your module.
         
*/

var routers = [
    require('./basic_routes.js'),
    require('./login_routes.js'),
    require('./lobby_routes.js'),
    require('./chat_routes.js')
];


exports.register = (socket, io) => {
    routers.forEach(function(entry){
        console.log("[I] Registering "+entry.name+".");
        entry.register(socket, io);
    });
};
