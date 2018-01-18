const model = require("../_model/userModel");

function checkLogin(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
  } else {
    res.redirect("/signin");
  }
}

function getUser(req, res, next) {
  res.locals.currentUser = req.session.currentUser;
  next();
}

module.exports = {
  checkLogin,
  getUser
};
