const model = require("../_model/userModel");

module.exports = app => {
  //render user profile page
  app.get("/profile", function(req, res) {
    model.getUserInfoByID(1).then(function(arrayUser) {
      var ve = {
        user: arrayUser[0]
      };
      res.render("User/UserInfor", ve);
    });
  });
  //render user home page when logged in
  app.get("/userhomepage", (req, res) => {
    res.render("User/UserHomePage");
  });
  //render signin page
  app.get("/signin", (req, res) => {
    res.render("User/Signin");
  });
  //render signup page
  app.get("/signup", (req, res) => {
    res.render("User/Signup");
  });
};
