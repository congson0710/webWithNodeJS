const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    modelForProd.getListProdFromCart().then(arrayProd => {
      console.log("list product:", arrayProd);
      var totalPrice = 0;
      if (arrayProd.length === 0) {
        const ve = { prodTotalPrice: totalPrice };
        res.render("User-Product/Cart-Paying", ve);
      } else {
        for (var i = 0; i < arrayProd.length; i++) {
          arrayProd[i].ProdSubTotal =
            arrayProd[i].ProdPrice * arrayProd[i].ProdQuantity;
          totalPrice += arrayProd[i].ProdSubTotal;
          arrayProd[i].id = i + 1;
        }
        const ve = {
          prod: arrayProd,
          prodTotalPrice: totalPrice
        };
        res.render("User-Product/Cart-Paying", ve);
      }
    });
  });

  app.post("/cart-paying", authenLoginMW, (req, res) => {
    // cancle cart
    if (req.body.flag == 0) {
      modelForProd.deleteListProd().then(affectedRows => {
        if (affectedRows >= 0) {
          res.redirect("/");
        }
      });
    } else if (req.body.flag == 1) {
      //accept cart
      if (res.local.user) {
      } else {
        res.redirect("/signin");
      }
    }
  });
};
