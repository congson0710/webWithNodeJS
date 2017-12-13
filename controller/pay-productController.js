const model = require("../model/userModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("Cart-Paying");
  });
};
