const model = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/product-oil", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Oil", ve);
    });
  });
  app.get("/product-tire", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Tire").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Tire", ve);
    });
  });
  app.get("/product-additivies", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Additivy").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Additivies", ve);
    });
  });
};
