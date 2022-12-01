const { model } = require("mongoose");

//middleware to check user login is true
var ensureAuth = function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("info", "you must be logged in to access this page")
        res.redirect("/login")
    }
}

//function to make sure the user is an admin
var ensureAd = function ensureAdmin(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("info", "You must be logged in as an admin to view this page")
        res.redirect("/")
    }
}
//exports both fucntions
module.exports = {ensureAuthenticated: ensureAuth, 
     ensureAdmin: ensureAd
}