const model = require("../_model/userModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("User-Product/Cart-Paying");
  });
};
