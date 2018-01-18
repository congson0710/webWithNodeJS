const model = require("../_model/userModel");

function checkLoginForLayout(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
  } else {
    next();
  }
}

function checkLoginForPayment(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
  } else {
    res.redirect("/signin");
  }
}

module.exports = {
  checkLoginForLayout: checkLoginForLayout,
  checkLoginForPayment: checkLoginForPayment
};
