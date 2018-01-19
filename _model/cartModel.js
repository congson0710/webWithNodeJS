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
    'select UserName, CartID, DATE_FORMAT(Date, "%d/%m/%Y, %h:%i:%s") as Date from cart inner join user_profile on user_profile.UserID = cart.UserID and user_profile.UserID="{{UserID}}"',
    currentUser
  );
  return db.load(sql);
};

exports.getProductsInCartByCartID = cart => {
  const sql = mustache.render(
    'select * from cart_info inner join cart on cart_info.CartID = cart.CartID and cart.CartID = "{{CartID}}"',
    cart
  );
  return db.load(sql);
};
