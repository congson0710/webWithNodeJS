const model = require("../_model/productModel");

module.exports = app => {
  app.get("/product-oil", (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      var ve = { prod: arrayProd };
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

  //
  app.post("/product-oil", (req, res) => {
    //check if product already exists in cart table
    model.getProdByName(req.body).then(arrayProd => {
      console.log("prod: ", req.body);
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {});
      } else {
        model.insertProdToCart(req.body).then(insertID => {
          console.log("insert success: ", insertID);
        });
      }
    });
  });
  app.post("/product-tire", (req, res) => {
    //check if product already exists in cart table
    model.getProdByName(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {});
      } else {
        model.insertProdToCart(req.body).then(insertID => {});
      }
    });
  });
  app.post("/product-additivies", (req, res) => {
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
