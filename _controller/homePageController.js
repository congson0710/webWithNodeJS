const model = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/", (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      const ve = {
        prod: arrayProd,
        currentUser: res.locals.currentUser !== undefined
      };
      res.render("HomePage/HomePage", ve);
    });
  });

  app.post("/", (req, res) => {
    //check if product already exists in cart table
    model.getProdFromTempCartByID(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {
          res.redirect("/");
        });
      } else {
        model.insertProdToCart(req.body).then(insertID => {
          res.redirect("/");
        });
      }
    });
  });
};
