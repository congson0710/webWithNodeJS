const model = require("../_model/productModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  app.get("/product-oil", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Oil").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Oil", ve);
    });
  });
  app.get("/product-tire", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Tire").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Tire", ve);
    });
  });
  app.get("/product-additivies", authenLoginMW.checkLogin, (req, res) => {
    model.getProdByType("Additivy").then(arrayProd => {
      var ve = { prod: arrayProd };
      res.render("Product/Product-Additivies", ve);
    });
  });

  //
  app.post("/product-oil", (req, res) => {
    //check if product already exists in cart table
    model.getProdFromCartByID(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {
          res.redirect("/product-oil");
        });
      } else {
        model.getMaxCartIDFromCartTB().then(listCartID => {
          if (listCartID[0].CartID == null) {
            listCartID[0].CartID = 1;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-oil");
            });
          } else {
            listCartID[0].CartID++;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-oil");
            });
          }
        });
      }
    });
  });
  app.post("/product-tire", (req, res) => {
    //check if product already exists in cart table
    model.getProdFromCartByID(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {
          res.redirect("/product-tire");
        });
      } else {
        model.getMaxCartIDFromCartTB().then(listCartID => {
          if (listCartID[0].CartID == null) {
            listCartID[0].CartID = 1;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-tire");
            });
          } else {
            listCartID[0].CartID++;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-tire");
            });
          }
        });
      }
    });
  });
  app.post("/product-additivies", (req, res) => {
    //check if product already exists in cart table
    model.getProdFromCartByID(req.body).then(arrayProd => {
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {
          res.redirect("/product-additivies");
        });
      } else {
        model.getMaxCartIDFromCartTB().then(listCartID => {
          if (listCartID[0].CartID == null) {
            listCartID[0].CartID = 1;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-additivies");
            });
          } else {
            listCartID[0].CartID++;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/product-additivies");
            });
          }
        });
      }
    });
  });
};
