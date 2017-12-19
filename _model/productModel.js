var db = require("../_helper/database");
var mustache = require("mustache");

//get product by type
exports.getProdByType = function(productType) {
  var product = { prodType: productType };
  var sql = mustache.render(
    'select * from  product where ProdType = "{{prodType}}"',
    product
  );
  return db.load(sql);
};
//get product by name
exports.getProdByName = product => {
  var sql = mustache.render(
    'select * from product where ProdName = "{{ProdName}}"',
    product
  );
  console.log("sql: ", sql);
  return db.load(sql);
};
//cart table
//check if product already exists in cart table
exports.getProdByName = product => {
  var sql = mustache.render(
    'select * from cart where ProdName = "{{ProdName}}"',
    product
  );
  return db.load(sql);
};

//insert product to cart tb by name
exports.insertProdToCart = product => {
  console.log("product obj: ", product);
  var sql = mustache.render(
    'INSERT INTO cart (ProdName,ProdQuantity,ProdPrice,ProdSubTotal) VALUES ("{{ProdName}}", "{{ProdQuantity}}", "{{ProdPrice}}", "{{ProdSubTotal}}")',
    product
  );
  console.log("sql: ", sql);
  return db.insert(sql);
};

//update product info from cart tb
exports.updateProdInfo = product => {
  product.ProdQuantity++;
  product.ProdSubTotal = product.ProdPrice * product.ProdQuantity;
  var sql = mustache.render(
    'update cart set ProdQuantity = "{{ProdQuantity}}", ProdSubTotal = "{{ProdSubTotal}}"  where ProdName = "{{ProdName}}"',
    product
  );
  console.log("sql: ", sql);
  return db.update(sql);
};

//get list product from cart tb
exports.getListProd = product => {
  var sql = "select * from cart";
  return db.load(sql);
};

//delete list product from cart tb
exports.deleteListProd = () => {
  var sql = "delete from cart";
  return db.delete(sql);
};
