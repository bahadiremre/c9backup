var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, wellcome");
})

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof woof!",
        cat: "Meow",
        bee: "buzz"
    }

    res.send("The " + animal + " says '" + sounds[animal] + "'")
})

app.get("/repeat/:comment/:count", function(req, res) {
    var count = Number(req.params.count);
    var message = req.params.comment;
    var result = ""
    
    for (var i = 0; i < count; i++) {
        result += " " + message;
    }

    res.send(result);
})

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server is on : " + process.env.IP + ":" + process.env.PORT);
});
