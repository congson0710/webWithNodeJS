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
    'INSERT INTO temp_cart (ProdID, ProdQuantity) VALUES ("{{ProdID}}",  "{{ProdQuantity}}")',
    product
  );
  return db.insert(sql);
};

//update product info from cart tb
exports.updateProdInfo = product => {
  console.log("prodid: ", product);
  var sql = mustache.render(
    'update temp_cart set ProdQuantity = ProdQuantity + 1 where ProdID = "{{ProdID}}"',
    product
  );
  return db.update(sql);
};

//get list product from cart tb
exports.getListProdFromCart = () => {
  var sql =
    "select product.ProdName, product.ProdPrice, temp_cart.ProdQuantity, temp_cart.id from product inner join temp_cart on product.ProdID = cart_info.ProdID";
  return db.load(sql);
};

exports.getProdFromProdTBByID = product => {
  const sql = mustache.render(
    'select * from product where ProdID = "{{ProdID}}"',
    product
  );
  return db.load(sql);
};

exports.updateProdQuanInProdTB = product => {
  const sql = mustache.render(
    'update product set product.ProdQuantityLeft = product.ProdQuantityLeft - {{ProdQuantity}} where product.ProdID = "{{ProdID}}"',
    product
  );
  return db.update(sql);
};
