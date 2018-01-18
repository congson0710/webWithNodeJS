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
    'select * from cart where UserID = "{{UserID}}"',
    currentUser
  );
  return db.load(sql);
};
