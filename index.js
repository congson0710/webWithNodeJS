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
    layoutsDir: "views/layouts/",
    partialsDir: "views/partials/",
    helpers: {
      section: sections()
    }
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");

//Controller

//Route Product
require("./controller/pay-productController")(app);
//Route HomePage
require("./controller/homePageController")(app);
//Route Authenticate
require("./controller/authenticateController")(app);
//Route User
require("./controller/userController")(app);
app.listen(8000);
