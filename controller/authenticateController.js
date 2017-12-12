const model = require("../model/model");

module.exports = app => {
  app.get("/signin", function(req, res) {
    var ve = {
      layout: false
    };
    res.render("Signin", ve);
  });

  // app.post("/signin")

  app.get("/signup", function(req, res) {
    var ve = {
      layout: false
    };
    res.render("Signup", ve);
  });

  app.post("/signup", (req, res) => {
    // PUT thong tin vao database
    model.insertUserInfo(req.body).then(id => {
      res.redirect("/signin");
    });
  });
};
