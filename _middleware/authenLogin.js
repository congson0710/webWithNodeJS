const model = require("../_model/userModel");

module.exports = function(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
  } else {
    next();
  }
};
