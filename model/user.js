/**
 * @Author: Argann BONNEAU
 * @Date:   31-07-2017 11:18
 * @Email:  argann.b@hotmail.fr
 * @Project: Buried Sky
 * @Filename: user.js
 * @Last modified by:   Argann BONNEAU
 * @Last modified time: 09-08-2017 11:04
 */


exports.create = () => {
    return {
        "username" : "",
        "level" : 0,
        "xp" : 0,
        "rating": 0,
        "state": "disconnected"
    };
};
