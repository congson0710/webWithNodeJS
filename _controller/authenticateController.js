const model = require("../_model/userModel");

module.exports = app => {
  // app.post("/signin")
  app.post("/signin", (req, res) => {
    model.checkUserNameForSignin(req.body).then(arrayUser => {
      if (arrayUser.length > 0) {
        model.checkUserSigninInfo(req.body).then(arrayUser => {
          if (arrayUser.length > 0) {
            req.session.user = arrayUser[0];
            var hour = 1000 * 60 * 60 * 24;
            req.session.cookie.maxAge = hour;
            res.redirect("/");
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
