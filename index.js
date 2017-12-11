const express = require("express");
const morgan = require("morgan");
const model = require("./model");
const handlebars = require("express-handlebars");
const path = require("path");

// express module
const app = express();
// morgan module for "middlewares"
app.use(morgan("dev"));

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
    partialsDir: "views/partials/"
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");

app.get("/signin", function(req, res) {
  var ve = {
    layout: false
  };
  res.render("Signin", ve);
});

app.get("/profile", function(req, res) {
  model.getUserInfoByID(1).then(function(arrayUser) {
    var ve = {
      layout: false,
      user: arrayUser[0]
    };
    res.render("UserInfor", ve);
  });
});

app.listen(8000);
