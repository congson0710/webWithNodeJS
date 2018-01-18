const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const sections = require("express-handlebars-sections");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const authMiddleware = require("./_middleware/authenLogin");

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

//handlebars
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

var options = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "1412468",
  database: "userinfo"
};

//mw
// app.use(authenLoginMW);
app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

var sessionStore = new MySQLStore(options);
//session
app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  })
);

//Route Product
require("./_controller/productController")(app);
require("./_controller/pay-productController")(app);
//Route HomePage
require("./_controller/homePageController")(app);
//Route Authenticate
require("./_controller/authenticateController")(app);
//Route User
require("./_controller/userController")(app);

app.use(authMiddleware.checkLoginForLayout);
app.use(authMiddleware.checkLoginForPayment);

app.listen(8000);
