const express = require("express");

const app = express();

app.get("/hello/:id", function (req, res) {
    console.log(req.params);
    res.end("HELLO WORLD");
})
app.listen(8000);