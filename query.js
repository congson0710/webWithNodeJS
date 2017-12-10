var db = require("./database")


exports.getAllUser = function () {
    var sqlQuery = 'SELECT * FROM userinfo.user_profile';
    return db.load(sqlQuery);
}