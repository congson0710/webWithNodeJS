const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("User-Product/Cart-Paying", ve);
  });
  app.post("/cart-paying", (req, res) => {
    modelForProd.getProdByName(req.body).then(arrayProd => {
      var ve = { prod: arrayProd };
      console.log("view engine: ", ve);
      res.render("User-Product/Cart-Paying", ve);
    });
  });
};
