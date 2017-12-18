const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const sections = require("express-handlebars-sections");
const path = require("path");
const bodyParser = require("body-parser");

// express module
const app = express();
// morgan module for "middlewares"
app.use(morgan("dev"));

// Filter object form from view
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/_layouts/",
    partialsDir: "views/partials/",
    helpers: {
      section: sections(),
      formatMoney: number => {
        return "$" + number;
      }
    }
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Controller

//Route Product
require("./_controller/productController")(app);
require("./_controller/pay-productController")(app);
//Route HomePage
require("./_controller/homePageController")(app);
//Route Authenticate
require("./_controller/authenticateController")(app);
//Route User
require("./_controller/userController")(app);
app.listen(8000);
