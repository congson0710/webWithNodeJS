const model = require("../model/userModel");

module.exports = app => {
  app.get("/profile", function(req, res) {
    model.getUserInfoByID(1).then(function(arrayUser) {
      var ve = {
        user: arrayUser[0]
      };
      res.render("UserInfor", ve);
    });
  });
};
