var db = require("./database")


exports.getUserByUserID = function () {
    var sqlQuery = 'SELECT UserID FROM userinfo.user_profile';
    return db.load(sqlQuery);
}