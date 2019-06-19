var express = require("express");
var app = express();

app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/", function(req,res){
    res.render("home");
})

app.get("/fallinlovewith/:dog", function(req,res){
    var dog = req.params.dog;
    res.render("dogs", {dogType:dog})
})

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author:"Bes"},
        {title: "Post 2", author:"Abc"},
        {title: "Post 3", author:"Crzy"}
        ];
    res.render("posts",{posts:posts});
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is on");
})