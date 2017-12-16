const model = require("../_model/productModel");

module.exports = app => {
  app.get("/product-oil", (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Oil", ve);
    });
  });
  app.get("/product-tire", (req, res) => {
    model.getProdByType("Tire").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Tire", ve);
    });
  });
  app.get("/product-additivies", (req, res) => {
    model.getProdByType("Additivy").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Additivies", ve);
    });
  });
};
