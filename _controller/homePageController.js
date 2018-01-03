const model = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/", authenLoginMW, (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      const ve = { prod: arrayProd, currentUser: res.locals.currentUser };
      res.render("HomePage/HomePage", ve);
    });
  });

  app.post("/", (req, res) => {
    //check if product already exists in cart table
    model.getProdFromCartByID(req.body).then(arrayProd => {
      console.log("prod id", req.body);
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {});
      } else {
        model.insertProdToCart(req.body).then(insertID => {});
      }
    });
  });
};
