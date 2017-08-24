/**
 * @Author: Argann BONNEAU
 * @Date:   09-08-2017 10:46
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: matchmaker.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 09-08-2017 11:14
 */

 // --- Requirements ---
 var logger = require("../utils/logger");

 // --- Variables ---
 var queue = [];

 exports.pop = (elem) => {
     var i = queue.indexOf(elem);
     if (i !== -1){
         queue.splice(i, 1);
     }
 };

 exports.push = (elem) => {
     
 };
