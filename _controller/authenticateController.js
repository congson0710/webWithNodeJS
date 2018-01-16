const model = require("../_model/userModel");

module.exports = app => {
  // app.post("/signin")
  app.post("/signin", async (req, res) => {
    const arrayUser = await model.checkUserAccountForSignin(req.body);
    const accUser = await model.checkUserSigninInfo(req.body);

    if (arrayUser.length !== 0 && accUser !== 0) {
      req.session.currentUser = arrayUser[0];
      var hour = 1000 * 60 * 60 * 24;
      req.session.cookie.maxAge = hour;
      res.redirect("/");
    } else {
      res.redirect("/signin");
    }
  });

  //app.post("/signup")
  app.post("/signup", (req, res) => {
    model.insertUserInfo(req.body).then(id => {
      res.redirect("/signin");
    });
  });
};
