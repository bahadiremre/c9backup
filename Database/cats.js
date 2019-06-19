var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{ useNewUrlParser: true });

var catSchema = mongoose.Schema({
    name: String,
    age : Number,
    temperament : String
});

var Cat = mongoose.model("Cat",catSchema);

Cat.create({
    name:  "Tekir",
    age: 15,
    temperament: "nice"
});

// var myCat = new Cat({
//     name:"Pamuk",
//     age:12,
//     temperament: "bland"
// })

// myCat.save((error,cat)=>{
//     if(error)
//     console.log(error);
//     else
//     console.log(cat);
// })

Cat.find({}, (error,cats)=>{
    if(error)
        console.log(error);
    else
        console.log(cats);
    
})