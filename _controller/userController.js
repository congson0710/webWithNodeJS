const model = require("../_model/userModel");
const authenLoginMW = require("../_middleware/authenLogin");

module.exports = app => {
  //render user profile page
  app.get("/profile", authenLoginMW, function(req, res) {
    model.getUserInfoByID(1).then(function(arrayUser) {
      var ve = { user: arrayUser[0] };
      res.render("User/UserInfor", ve);
    });
  });
  //render user home page when logged in
  app.get("/userhomepage", authenLoginMW, (req, res) => {
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
  app.get("/signout", (req, res) => {
    req.session.destroy();
    res.redirect("/signin");
  });
};
