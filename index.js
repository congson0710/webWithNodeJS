const express = require("express");
const morgan = require("morgan");
const controler = require("./query");

// express module
const app = express();
// morgan module for "middlewares"
app.use(morgan("dev"))

app.get("/hello", function (req, res) {
    // tell "db.load" to catch "promise" after excuting "load"
    controler.getUserByUserID().then(function (rows) {
        console.log("RESULT:", rows);
    })



    // db.load("SELECT * FROM userinfo.user_profile").then(function (results) {
    //     console.log("RESULT", results);
    // })
    res.end("HELLO WORLD");
})
app.listen(8000);