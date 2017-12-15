const model = require("../_model/userModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("User-Product/Cart-Paying");
  });
  app.get("/product-oil", (req, res) => {
    res.render("Product/Product-Oil");
  });
  app.get("/product-tire", (req, res) => {
    res.render("Product/Product-Tire");
  });
  app.get("/product-additivies", (req, res) => {
    res.render("Product/Product-Additivies");
  });
};