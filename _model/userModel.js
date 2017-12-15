var db = require("../_helper/database");
var mustache = require("mustache");

//get all user from table
exports.getAllUser = function() {
  var sqlQuery = "SELECT * FROM userinfo.user_profile";
  return db.load(sqlQuery);
};
//get user info by userid
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
//insert 1 user into table
exports.insertUserInfo = user => {
  const sql = mustache.render(
    'INSERT INTO user_profile (UserName,UserPassword,Email) VALUES ("{{UserName}}", "{{UserPassword}}", "{{Email}}")',
    user
  );
  return db.insert(sql);
};

exports.checkUserNameForSignin = userInfo => {
  const sql = mustache.render(
    'select * from user_profile where UserName = "{{UserName}}"',
    userInfo
  );
  return db.load(sql);
};

exports.checkUserSigninInfo = userInfo => {
  const sql = mustache.render(
    'select * from user_profile where UserName = "{{UserName}}" and UserPassword = "{{UserPassword}}"',
    userInfo
  );
  return db.load(sql);
};
