/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 13:05
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: logger.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 13:11
 */


var colors = require("colors/safe");

module.exports.debug = (message) => {
    console.log(colors.grey.italic("[I] %s"), message);
};

module.exports.error = (message) => {
    console.log(colors.red("[E] %s"), message);
};

module.exports.critical = (message) => {
    console.log(colors.bgRed.black("[C] %s"), message);
};

module.exports.success = (message) => {
    console.log(colors.green("[S] %s"), message);
};
