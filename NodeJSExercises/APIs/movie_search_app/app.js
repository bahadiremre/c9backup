var express = require("express");
var app =  express();
var request = require("request");
// var bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs");

app.get("/results",(req,res)=>{
    var movieTitle = req.query.movieTitle;
    var url ='http://www.omdbapi.com/?apikey=thewdb&s=' + movieTitle;
    request(url,(error,response,body)=>{
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results",{data:data});
        }
    })
})

app.get("/",(req,res)=>{
    res.render("search")
})

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("Movie App has started");
})