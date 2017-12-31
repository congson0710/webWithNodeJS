const model = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/", authenLoginMW, function(req, res) {
    model.getProdByType("Oil").then(arrayProd => {
      const ve = { prod: arrayProd, user: res.locals.user };
      console.log("view engine: ", ve);
      res.render("HomePage/HomePage", ve);
    });
  });

  app.post("/", (req, res) => {
    //check if product already exists in cart table
    model.getProdByName(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {});
      } else {
        model.insertProdToCart(req.body).then(insertID => {});
      }
    });
  });
};
