const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"))

app.get("/hello", function (req, res) {
    res.end("HELLO WORLD");
})
app.listen(8000);