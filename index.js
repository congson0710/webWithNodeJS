const express = require("express");
const morgan = require("morgan");
const db = require("./database");

// express module
const app = express();
// morgan module for "middlewares"
app.use(morgan("dev"))

app.get("/hello", function (req, res) {
    // tell "db.load" to catch "promise" after excuting "load"
    db.load("SELECT * FROM userinfo.user_profile").then(function (results) {
        console.log("RESULT", results);
    })
    res.end("HELLO WORLD");
})
app.listen(8000);