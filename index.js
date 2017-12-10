const express = require("express");
const morgan = require("morgan");
const controler = require("./query");
const handlebars = require("express-handlebars");

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

app.set("view engine", "hbs");

app.get("/hello", function(req, res) {
  // tell "db.load" to catch "promise" after excuting "load"
  controler.getAllUser().then(function(arrayUser) {
    console.log("RESULT:", arrayUser);
  });

  // db.load("SELECT * FROM userinfo.user_profile").then(function (results) {
  //     console.log("RESULT", results);
  // })
  res.end("HELLO WORLD");
});
app.listen(8000);
