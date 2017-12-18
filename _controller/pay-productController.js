const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("User-Product/Cart-Paying");
  });
};
