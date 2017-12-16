const model = require("../_model/productModel");

module.exports = app => {
  app.get("/product-oil", (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      var ve = { prod: arrayProd };
      console.log("array: ", ve);
      res.render("Product/Product-Oil", ve);
    });
  });
  app.get("/product-tire", (req, res) => {
    model.getProdByType("Tire").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Tire", ve);
    });
  });
  app.get("/product-additivies", (req, res) => {
    model.getProdByType("Additivy").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Additivies", ve);
    });
  });

  // //
  // app.post("/product-oil", (req, res) => {
  //   model.getProdByName(req.body).then(arrayProd => {
  //     var ve = {
  //       prod: arrayProd
  //     };
  //     res.render("User-Product/Cart-Paying", ve);
  //   });
  // });
  // app.post("/product-tire", (req, res) => {
  //   model.getProdByName(req.body).then(arrayProd => {
  //     var ve = {
  //       prod: arrayProd
  //     };
  //     res.render("User-Product/Cart-Paying", ve);
  //     res.redirect("/cart-paying");
  //   });
  // });
  // app.post("/product-additivies", (req, res) => {
  //   model.getProdByName(req.body).then(arrayProd => {
  //     var ve = {
  //       prod: arrayProd
  //     };
  //     res.render("User-Product/Cart-Paying", ve);
  //   });
  // });
};
