const model = require("../model/userModel");

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("HomePage");
  });
};
