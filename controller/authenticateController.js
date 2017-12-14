const model = require("../model/userModel");

module.exports = app => {
  //Signin
  app.get("/signin", function(req, res) {
    res.render("Signin");
  });

  // app.post("/signin")
  app.post("/signin", (req, res) => {
    model.checkingUserNameForLogin(req.body).then(arrayUser => {
      if (arrayUser.length > 0) {
        model.checkingPasswordForLogin(req.body).then(objUser => {
          if (objUser.length > 0) {
            res.redirect("/homesignedin");
          } else {
            res.redirect("/signin");
          }
        });
      } else {
        res.redirect("/signin");
      }
    });
  });

  //Signup
  app.get("/signup", function(req, res) {
    res.render("Signup");
  });
  //app.post("/signup")
  app.post("/signup", (req, res) => {
    // PUT thong tin vao database
    model.insertUserInfo(req.body).then(id => {
      res.redirect("/signin");
    });
  });
};
