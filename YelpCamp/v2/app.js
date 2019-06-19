var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });

var schema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",schema);

// Campground.create(
//     {
//     name: "Granite Hill",
//     image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     description: "This is a huge granite hill. No bathrooms. No water. Beautiful granites!"
//     },
//     (err,campground)=>{
//         if(err)
//             console.log(err);
//         else{
//             console.log("NEWLY CREATED CAMPGROUND:");
//             console.log(campground);
//         }
            
//     }
//     )

app.get("/",(req,res)=>{
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req,res)=>{
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    })
    
});

//CREATE - add new campground to DB
app.post("/campgrounds", (req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name,image:image,description:description};
    Campground.create(newCampground,(err,campground)=>{
        if(err){
            console.log(err)
        } else {
            console.log("NEW CAMPGROUND ADDED");
            console.log(campground);
        }
    })
    res.redirect("/campgrounds");
});

//NEW - show form to create new campground
app.get("/campgrounds/new", (req,res)=>{
    res.render("new");
});

//SHOW - shows more info about a campground
app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id, (err,foundCampground)=>{
        if(err){
            console.log(err)
        } else {
            res.render("show",{campground:foundCampground})
        }
    })
    
    
})

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log("The Yelp Camp Server Has Started!");
})