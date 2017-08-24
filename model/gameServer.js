/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 18:25
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: gameServer.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 09-08-2017 10:43
 */

// --- Requirements ---
var logger = require("../utils/logger");
var Matchmaker = require("matchmaker");

// --- Variables ---
var mymatch = new Matchmaker();

mymatch.policy = (a,b) => {
    if (typeof a !== 'undefined' && typeof b !== 'undefined'){
        if (Math.abs(a._user.level - b._user.level) < 5){
            return 100;
        } else {
            return 0;
        }
    } else {
        return 0;
    }

};

mymatch.on('match', result => {
    result.a.emit("match-found");
    result.b.emit("match-found");
    logger.debug("A new match is going to start : "+a._user.username+" VS "+b._user.username);
});
mymatch.start();

// --- Methods ---
exports.searchForMatch = (socket) => {
    logger.debug("Player "+socket._user.username+" wants to find an enemy.");
    mymatch.push(socket);
};
