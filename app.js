var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
const {sendEnquiryEmail} =  require("./emails/account");
const User = require("./models/user");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL , {useNewUrlParser : true ,
                                useUnifiedTopology: true});


const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req , res)=>{
    res.render("landing");
});

app.get("/about" ,(req, res)=>{
    res.render("about");
});

app.get("/services" , (req, res)=>{
    res.render("services");
});

app.get("/portfolio" , (req,res)=>{
    res.render("portfolio");
});

app.get("/pricing" ,(req,res)=>{
    res.render("pricing");
});

app.get("/contact" , (req,res)=>{
    res.render("contact");
})

app.get("/queryNoted" , (req ,res)=>{
    res.render("queryNoted")
})

app.post("/users" , (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    const newUser = {name, email, subject, message};

    User.create(newUser , (err , newUser)=>{
        if(err){
            console.log(err);
        }
        else{
            sendEnquiryEmail(name , email, subject, message);
            res.redirect("/queryNoted");
        }
    });
});


app.get("/users/database" , (req, res)=>{
    User.find({} , (err , users)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(users);
        }
    });
});

app.listen(port, function(){
    console.log("The Website Server has Started on Port" , port);
 });