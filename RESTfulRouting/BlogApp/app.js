var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
    
// APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "TEST BLOG",
//     image: "https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80",
//     body: "This a new blog"
// })

// ROUTES
app.get("/",(req,res)=>{
    res.redirect("/blogs");
});

app.get("/blogs", (req,res)=>{
    Blog.find({}, (err,blogs)=>{
        if (err) {
            console.log("ERROR!!");
        } else {
            res.render("index",{blogs:blogs});
        }
    });
});


app.listen(process.env.PORT, process.env.IP , ()=>{
    console.log("SERVER IS RUNNING");
})