/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 11:35
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: database.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 31-07-2017 18:14
 */

var mysql = require('mysql');
var config = require('config');
var logger = require('../utils/logger.js');

var db_conf = {
    connectionLimit:    config.get("Database.connectionLimit"),
    host:               config.get("Database.host"),
    user:               config.get("Database.user"),
    password:           config.get("Database.password"),
    database:           config.get("Database.database"),
    connectTimeout:     config.get("Database.connectTimeout"),
};

var pool = mysql.createPool(db_conf);

pool.getConnection(function(err, connection){
    if(err){
        console.log("[E] Can't connect to database.");
    } else {
        logger.debug("Successfully connected to database.");
    }
});

pool.on('error', function(err){
    console.log("[E] Database error : "+err.code);
});

module.exports = pool;
