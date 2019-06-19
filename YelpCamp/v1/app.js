const express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("landing");
})

var campgrounds = [
         {name:"Salmon Creek", image:"https://farm5.staticflickr.com/4067/4576229670_1fbf4102e6.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e036b80a20fc1c22d2524518b7444795ea76e5d004b0144495f1c57ba1e5b6_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Salmon Creek", image:"https://farm5.staticflickr.com/4067/4576229670_1fbf4102e6.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e036b80a20fc1c22d2524518b7444795ea76e5d004b0144495f1c57ba1e5b6_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name:"Salmon Creek", image:"https://farm5.staticflickr.com/4067/4576229670_1fbf4102e6.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e036b80a20fc1c22d2524518b7444795ea76e5d004b0144495f1c57ba1e5b6_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"}
    ]

app.get("/campgrounds", (req,res)=>{
    res.render("campgrounds",{campgrounds:campgrounds});
})

app.post("/campgrounds", (req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req,res)=>{
    res.render("new");
})

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("The Yelp Camp Server Has Started!");
})