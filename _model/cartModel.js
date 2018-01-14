var db = require("../_helper/database");
var mustache = require("mustache");

exports.insertCartToUSer = (cart, user) => {
  var cart = {
    CartID: cart.CartID,
    UserID: user.UserID
  };
  const sql = mustache.render(
    'insert into cart (UserID, CartID) values ("{{UserID}}", "{{CartID}}")',
    cart
  );
  console.log("sql is:", sql);
  return db.insert(sql);
};
