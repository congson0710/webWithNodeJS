var db = require("../_helper/database");
var mustache = require("mustache");

exports.insertCartToUSer = (cart, user) => {
  const sql = mustache.render("insert into cart (UserID, CartID)");
};
