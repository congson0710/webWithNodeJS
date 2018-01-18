var db = require("../_helper/database");
var mustache = require("mustache");

exports.addtCartForUSer = currentUser => {
  var cart = {
    UserID: currentUser.UserID,
    Date: currentUser.currentTime
  };
  const sql = mustache.render(
    'insert into cart (UserID, Date) values ("{{UserID}}", "{{Date}}")',
    cart
  );
  return db.insert(sql);
};
