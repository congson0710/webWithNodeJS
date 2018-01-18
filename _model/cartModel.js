var db = require("../_helper/database");
var mustache = require("mustache");

exports.addtCartForUSer = currentUser => {
  var cart = {
    UserID: currentUser.UserID
  };
  const sql = mustache.render(
    'insert into cart (UserID, Date) values ("{{UserID}}", NOW())',
    cart
  );
  return db.insert(sql);
};

exports.addProductToCart = product => {
  const sql = mustache.render(
    'insert into cart_info (CartID, ProdID, ProdQuantity) values ("{{CartID}}", "{{ProdID}}", "{{ProdQuantity}}")',
    product
  );
  return db.insert(sql);
};

exports.loadCartByUserID = currentUser => {
  const sql = mustache.render(
    'select UserName, CartID, Date from cart inner join user_profile on user_profile.UserID = cart.UserID and user_profile.UserID="{{UserID}}"',
    currentUser
  );
  console.log("sql: ", sql);
  return db.load(sql);
};
