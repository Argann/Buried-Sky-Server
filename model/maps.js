/**
 * @Author: Argann BONNEAU
 * @Date:   03-08-2017 16:11
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: maps.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 05-08-2017 17:49
 */

/*
This Module handle the game maps.
*/

// --- Requirements ---
var glob = require("glob");
var logger = require("../utils/logger");

// --- Const ---
const mapsDirectory = __dirname+"/../assets/maps/"; // The directory where the maps are stored.

// --- Variables ---
var maps = [];

// --- Registering maps from the maps directory ---
exports.registerMaps = () => {
    logger.debug("Starting registering maps.");
    glob(mapsDirectory+"*.js", (er, files) => { // We check every js files in the maps directory.
        if(er) throw er;                        // If there is an error, throw it.
        files.forEach(file => {                 // For each map file found...
            logger.debug("Registering map "+file);
            maps.push(require(file));           // We load it in the maps list.
        });
        logger.debug("Maps registration successful.");
    });
};

// --- Get a random map from the map list ---
exports.randomMap = () => {
    return maps[Math.floor(Math.random()*maps.length)];
};
