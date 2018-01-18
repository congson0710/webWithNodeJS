const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");
const modelForCart = require("../_model/cartModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/cart-paying", authenLoginMW.checkLoginForPayment, (req, res) => {
    res.render("User-Product/Cart-Paying");
  });

  app.post(
    "/cart-paying",
    authenLoginMW.checkLoginForLayout,
    async (req, res) => {
      const myCart = req.body;
      const cart = await Promise.all(
        myCart.temp_cart.map(async product => {
          let productInfo = await modelForProd.getProdFromProdTBByID(product);
          return { ...product, ...productInfo[0] };
        })
      );
      res.send(cart);
    }
  );

  app.post("/confirm-pay-cart", (req, res) => {
    let time = new Date();
    let month = time.getUTCMonth() + 1; //months from 1-12
    let day = time.getUTCDate();
    let year = time.getUTCFullYear();

    req.session.currentUser.currentTime = day + "/" + month + "/" + year;

    req.body.formSubmitton == 1
      ? modelForCart.addtCartForUSer(req.session.currentUser).then(insertID => {
          console.log("tao gio hang cho user thanh cong");
        })
      : res.redirect("/");
  });
};
