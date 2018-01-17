const modelForUser = require("../_model/userModel");
const modelForProd = require("../_model/productModel");
const modelForCart = require("../_model/cartModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/cart-paying", (req, res) => {
    res.render("User-Product/Cart-Paying");
  });

  app.post("/cart-paying", authenLoginMW, async (req, res) => {
    const myCart = req.body;
    const cart = await Promise.all(
      myCart.temp_cart.map(async product => {
        let productInfo = await modelForProd.getProdFromProdTBByID(product);
        return { ...product, ...productInfo[0] };
      })
    );
    res.send(cart);
  });
};
