const model = require("../_model/userModel");

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("HomePage/HomePage");
  });
};
