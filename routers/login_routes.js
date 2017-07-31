/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 11:30
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: login_routes.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 13:25
 */

var DB_CON = require('../model/database.js');
var bcrypt = require('bcrypt');
var config = require('config');
var logger = require('../utils/logger.js');

exports.name = "Login Router";

exports.register = (socket, io) => {
    // --- Login ---
    socket.on('login', function(data){
        logger.debug("Socket "+socket.id+" try to login.");
        // Parse the credentials send by the client.
        cred = JSON.parse(data);
        // Try to retrieve the user from the database
        DB_CON.query("SELECT * FROM Users WHERE username = ?", [cred.username],
            function(err, result){
                if(err){
                    logger.critical("An error occured when trying to query the database.");
                    throw err;
                }
                // If we found an user
                if(result.length === 1){
                    bcrypt.compare(cred.password, result[0].password,
                        function(err, bres){
                            // If it's the correct user
                            if(bres){
                                logger.success("Socket "+socket.id+" is now logged with username : "+result[0].username);
                                socket.emit("login-response", {success: true, message: "Login Succeed"});
                                socket._user = {
                                    "username" : result[0].username,
                                    "level" : result[0].level,
                                    "xp" : result[0].xp
                                };
                                socket._inLobby = true;
                                socket.join(config.get("Game.defaultLobbyRoomName"));
                            } else {
                                logger.error("Socket "+socket.id+" didn't used valid credentials.");
                                socket.emit("login-response", {success: false, message: "Login failed : invalid credentials"});
                            }
                        }
                    );
                } else {
                    logger.error("Socket "+socket.id+" didn't used valid username.");
                    socket.emit("login-response", {success: false, message: "Login failed : no user found"});
                }
            }
        );
    });
};
