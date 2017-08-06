/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 18:25
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: gameServer.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 05-08-2017 18:45
 */

var logger = require("../utils/logger");

var waitingPlayers = [];

exports.searchForMatch = (socket) => {
    var player = socker._user;
    waitingPlayers.push(player);
    findWaitingPlayer(player)
    .then((enemy) => {
        logger.debug("We found an enemy : "+enemy);
        socket.emit("match-found");
    })
    .catch((err) => {
        logger.error(""+err.message);
        socket.emit("no-match-found");
    });
};


var findWaitingPlayer = (player) => {
    return new Promise((resolve, reject) => {
        for (var p in waitingPlayers) {
            if (waitingPlayers.hasOwnProperty(p)) {
                if (p !== player){
                    resolve(p);
                }
            }
        }
        const er = new Error("There is no available player.");
        reject(er);
    });
};
