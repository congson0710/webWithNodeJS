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