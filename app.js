// used to create an instance of web application
var express = require("express")
var path = require("path")
var mongoose = require("mongoose");
var session = require("express-session");
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser");
var passport = require("passport");
var flash = require("connect-flash");
var params = require("./params/params");
const { application } = require("express");
var setuppassport = require("./setuppassport");
//create instance of app
var app = express();
mongoose.connect(params.DATABASECONNECTION);
setuppassport();
//connect top database later if needed

app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
//init packages
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({
    secret:"fhbwouedfhwldjfkjwdfkl5456454fkejfdn4",
    resave: false,
    saveUninitialized:false
}))
//create a static path for images
app.use("/uploads", express.static(path.resolve(__dirname, 'uploads')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
//app.use("/api", require("./routes/api"));

app.listen(app.get("port"),function(){
    console.log("SERVER STARTED ON PORT " + app.get("port"));
});