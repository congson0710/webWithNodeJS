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
          arrayProd[i].No = i + 1;
        }
        const ve = {
          prod: arrayProd,
          prodTotalPrice: totalPrice
        };
        res.render("User-Product/Cart-Paying", ve);
      }
    });
  });

  app.post("/cart-paying", (req, res) => {
    if (req.body.flag == 0) {
      modelForProd.deleteListProd().then(affectedRows => {
        if (affectedRows >= 0) {
          res.redirect("/");
        }
      });
    }
  });
};
