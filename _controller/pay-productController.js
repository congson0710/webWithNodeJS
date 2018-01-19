const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");
const modelForCart = require("../_model/cartModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/cart-paying", authenLoginMW.checkLogin, (req, res) => {
    res.render("User-Product/Cart-Paying");
  });

  app.post("/cart-paying", authenLoginMW.checkLogin, async (req, res) => {
    const myCart = req.body;
    const cart = await Promise.all(
      myCart.temp_cart.map(async product => {
        let productInfo = await modelForProd.getProdFromProdTBByID(product);
        return { ...product, ...productInfo[0] };
      })
    );
    res.send(cart);
  });

  app.post("/confirm-pay-cart", async (req, res) => {
    req.session.currentUser.currentTime = Date.now();

    if (req.body.formSubmitton == 1) {
      const CartID = await modelForCart.addtCartForUSer(
        req.session.currentUser
      );

      try {
        req.body.temp_cart.forEach(async product => {
          product.CartID = CartID;
          let addedRows = await modelForCart.addProductToCart(product);
          let updatedRows = await modelForProd.updateProdQuanInProdTB(product);
        });
        res.send({ status: "success" });
      } catch (error) {
        res.send({ status: "fail" });
      }
    } else {
      res.redirect("/");
    }
  });
};
