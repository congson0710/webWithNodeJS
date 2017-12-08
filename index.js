const express = require("express");
const morgan = require("morgan");
const db = require("./database");

const app = express();

app.use(morgan("dev"))

app.get("/hello", function (req, res) {
    db.load("SELECT * FROM userinfo.user_profile");
    res.end("HELLO WORLD");
})
app.listen(8000);