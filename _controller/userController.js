const modelForUser = require("../_model/usermodel");
const modelForCart = require("../_model/cartModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  //render user profile page
  app.get("/profile", authenLoginMW.checkLogin, function(req, res) {
    modelForUser
      .getUserInfoByID(res.locals.currentUser.UserID)
      .then(function(arrayUser) {
        var ve = { user: arrayUser[0] };
        res.render("User/UserInfor", ve);
      });
  });
  // change password page
  app.get("/changepass", authenLoginMW.checkLogin, function(req, res) {
    res.render("User/Changepass");
  });
  //render signin page
  app.get("/signin", (req, res) => {
    res.render("User/Signin");
  });
  //render signup page
  app.get("/signup", (req, res) => {
    res.render("User/Signup");
  });
  app.get("/signout", (req, res) => {
    req.session.destroy();
    res.redirect("/signin");
  });
  app.get("/history", authenLoginMW.checkLogin, async (req, res) => {
    let myCart = await modelForCart.loadCartByUserID(res.locals.currentUser);
    let productsInCart = await modelForCart.getProductsInCartByCartID(
      myCart[0]
    );

    let allProdInfo = await Promise.all(
      productsInCart.map(async product => {
        let prodInfo = await modelForCart.getProductsByProdID(product);
        return { ...prodInfo[0] };
      })
    );
    let tempPrice = allProdInfo.reduce((sum, amount) => ({
      ProdPrice: sum.ProdPrice + amount.ProdPrice
    }));

    myCart[0].TotalPrice = tempPrice.ProdPrice;
    myCart[0].ProdCount = productsInCart.length;

    let ve = {
      myCart
    };
    res.render("User/History", ve);
  });

  app.post("/profile", authenLoginMW.checkLogin, function(req, res) {
    modelForUser
      .updateUserInfo(res.locals.user.UserID, req.body)
      .then(function(changedRow) {
        res.redirect("/profile");
      });
  });

  app.post("/changepass", authenLoginMW.checkLogin, function(req, res) {
    modelForUser
      .updateUserPassword(res.locals.user.UserID, req.body)
      .then(function(changedRow) {
        res.redirect("/changepass");
      });
  });

  app.post("/history", authenLoginMW.checkLogin, async (req, res) => {
    console.log("asd", req.body);
    //let myProducts = await modelForCart.getProductsInCartByCartID(req.body);
  });
};
