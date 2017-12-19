const model = require("../_model/userModel");

module.exports = app => {
  // app.post("/signin")
  app.post("/signin", (req, res) => {
    model.checkUserNameForSignin(req.body).then(arrayUser => {
      if (arrayUser.length > 0) {
        model.checkUserSigninInfo(req.body).then(arrayUser => {
          if (arrayUser.length > 0) {
            res.redirect("/userhomepage");
          } else {
            res.redirect("/signin");
          }
        });
      } else {
        res.redirect("/signin");
      }
    });
  });

  //app.post("/signup")
  app.post("/signup", (req, res) => {
    model.insertUserInfo(req.body).then(id => {
      res.redirect("/signin");
    });
  });
};
