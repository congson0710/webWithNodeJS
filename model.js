var db = require("./database");
var mustache = require("mustache");

exports.getAllUser = function() {
  var sqlQuery = "SELECT * FROM userinfo.user_profile";
  return db.load(sqlQuery);
};

exports.getUserInfoByID = function(ID) {
  var User = {
    id: ID
  };
  var sqlQuery = mustache.render(
    "select * from user_profile where UserID = {{id}}",
    User
  );
  return db.load(sqlQuery);
};
