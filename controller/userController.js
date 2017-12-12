const model = require("../model/model");

module.exports = app => {
  app.get("/profile", function(req, res) {
    model.getUserInfoByID(1).then(function(arrayUser) {
      var ve = {
        layout: false,
        user: arrayUser[0]
      };
      res.render("UserInfor", ve);
    });
  });
};
