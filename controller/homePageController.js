const model = require("../model/userModel");

module.exports = app => {
  app.get("/", function(req, res) {
    var ve = {
      layout: false
    };
    res.render("HomePage", ve);
  });

  app.get("/homesignedin", function(req, res) {
    const ve = {
      layout: false
    };
    res.render("HomeSignedIn", ve);
  });
};
