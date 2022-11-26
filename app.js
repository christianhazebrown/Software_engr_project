// used to create an instance of web application
var express = require("express")
var path = require("path")
var mongoose = require("mongoose");
var session = require("express-session");
const { application } = require("express");
//create instance of app
var app = express();

//connect top database later if needed

app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/", require("./routes/web/routes"));
app.use(express.static(__dirname + '/views'))
//app.use("/api", require("./routes/api"));

app.listen(app.get("port"),function(){
    console.log("SERVER STARTED ON PORT " + app.get("port"));
});