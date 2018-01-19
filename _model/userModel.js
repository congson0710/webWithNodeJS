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
    'INSERT INTO user_profile (UserAccount,UserName,UserPassword,Email) VALUES ("{{UserAccount}}","{{UserName}}", "{{UserPassword}}", "{{Email}}")',
    user
  );
  return db.insert(sql);
};

exports.checkUserAccountForSignin = userInfo => {
  const sql = mustache.render(
    'select * from user_profile where UserAccount = "{{UserAccount}}"',
    userInfo
  );
  return db.load(sql);
};

exports.checkUserSigninInfo = userInfo => {
  const sql = mustache.render(
    'select * from user_profile where UserAccount = "{{UserAccount}}" and UserPassword = "{{UserPassword}}"',
    userInfo
  );
  return db.load(sql);
};

//update user info
exports.updateUserInfo = (UserID, userNewInfo) => {
  userNewInfo.UserID = UserID;
  const sql = mustache.render(
    'update user_profile set UserName = "{{UserName}}", Email = "{{Email}}", UserAddress = "{{UserAddress}}"  where UserID = "{{UserID}}"',
    userNewInfo
  );

  return db.update(sql);
};

//update user password
exports.updateUserPassword = (UserID, newUserPassword) => {
  newUserPassword.UserID = UserID;
  const sql = mustache.render(
    'update user_profile set UserPassword = "{{NewUserPassword}}" where UserID = "{{UserID}}"',
    newUserPassword
  );
  return db.update(sql);
};
