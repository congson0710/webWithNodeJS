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
      if (arrayProd.length > 0) {
        model.updateProdInfo(arrayProd[0]).then(changedRows => {
          res.redirect("/");
        });
      } else {
        model.getMaxCartIDFromCartTB().then(listCartID => {
          console.log("list id:", listCartID);
          if (listCartID[0].CartID == null) {
            listCartID[0].CartID = 1;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/");
            });
          } else {
            listCartID[0].CartID++;
            req.body.CartID = listCartID[0].CartID;
            model.insertProdToCart(req.body).then(insertID => {
              res.redirect("/");
            });
          }
        });
      }
    });
  });
};
