var db = require("../_helper/database");
var mustache = require("mustache");

//get product by type
exports.getProdByType = function(product) {
  var sql = mustache.render(
    'select * from  product where ProdType = "{{ProdType}}"',
    product
  );
  return db.load(sql);
};
