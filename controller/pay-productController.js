const model = require("../model/userModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("Cart-Paying");
  });
  app.get("/product-oil", (req, res) => {
    res.render("Product-Oil");
  });
  app.get("/product-tire", (req, res) => {
    res.render("Product-Tire");
  });
  app.get("/product-additivies", (req, res) => {
    res.render("Product-Additivies");
  });
};
