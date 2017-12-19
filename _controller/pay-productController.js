const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    modelForProd.getListProd(req.body).then(arrayProd => {
      var totalPrice = 0;
      if (arrayProd.length === 0) {
        const ve = { prodTotalPrice: totalPrice };
        res.render("User-Product/Cart-Paying", ve);
      } else {
        for (var i = 0; i < arrayProd.length; i++) {
          totalPrice += arrayProd[i].ProdSubTotal;
        }
        console.log("total price: ", totalPrice);
        const ve = {
          prod: arrayProd,
          prodTotalPrice: totalPrice
        };
        res.render("User-Product/Cart-Paying", ve);
      }
    });
  });
};
