const modelForUser = require("../_model/userModel");

module.exports = app => {
  // app.post("/signin")
  app.post("/signin", async (req, res) => {
    const existAccount = await modelForUser.checkUserAccountForSignin(req.body);
    const verifyAccAndPass = await modelForUser.checkUserSigninInfo(req.body);

    if (existAccount !== 0 && verifyAccAndPass !== 0) {
      res.locals.currentUser = verifyAccAndPass[0];
      req.session.currentUser = verifyAccAndPass[0];
      let hour = 1000 * 60 * 60 * 24;
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
