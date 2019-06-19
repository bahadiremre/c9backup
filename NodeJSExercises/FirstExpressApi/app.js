var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("hello there!");
})

app.get("/bye", function(req, res) {
    res.send("Goodbye");
})

app.get("/r/:subredditName", function(req, res) {
    res.send("this is a " + req.params.subredditName + " page");
})

app.get("*", function(req, res) {
    res.send("Page Not Found")
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is on");
})
