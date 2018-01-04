var db = require("../_helper/database");
var mustache = require("mustache");

//get product by type
exports.getProdByType = productType => {
  var product = {
    prodType: productType
  };
  var sql = mustache.render(
    'select * from  product where ProdType = "{{prodType}}"',
    product
  );
  return db.load(sql);
};

//get product by name
exports.getProdFromProdTBByName = product => {
  var sql = mustache.render(
    'select * from product where ProdName = "{{ProdName}}"',
    product
  );
  return db.load(sql);
};
//cart table
//check if product already exists in cart table
exports.getProdFromCartByName = product => {
  var sql = mustache.render(
    'select * from cart where ProdName = "{{ProdName}}"',
    product
  );
  return db.load(sql);
};

//get product from cart by id
exports.getProdFromCartByID = product => {
  const sql = mustache.render(
    'select * from cart_info where ProdID = "{{ProdID}}"',
    product
  );
  return db.load(sql);
};

//insert product to cart tb by product id
exports.insertProdToCart = product => {
  product.ProdQuantity = 1;
  var sql = mustache.render(
    'INSERT INTO cart_info (ProdID, CartID, ProdQuantity) VALUES ("{{ProdID}}", "{{CartID}}", "{{ProdQuantity}}")',
    product
  );
  return db.insert(sql);
};

//update product info from cart tb
exports.updateProdInfo = product => {
  var sql = mustache.render(
    'update cart_info set ProdQuantity = ProdQuantity + 1 where ProdID = "{{ProdID}}"',
    product
  );
  console.log("update sql: ", sql);
  return db.update(sql);
};

//get list product from cart tb
exports.getListProdFromCart = () => {
  var sql =
    "select product.ProdName, product.ProdPrice, cart_info.ProdQuantity, cart_info.id from product inner join cart_info on product.ProdID = cart_info.ProdID";
  return db.load(sql);
};

//delete list product from cart tb
exports.deleteListProd = () => {
  var sql = "delete from cart_info";
  return db.delete(sql);
};

exports.getMaxCartIDFromCartTB = () => {
  const sql = "select max(CartID) as CartID from cart";
  return db.load(sql);
};
