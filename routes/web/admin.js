var express = require("express");
const moviePost = require("../../models/movie");
var ensureAuthenticatedAdmin = require("../../auth/auth").ensureAdmin

var router = express.Router();
//require the scheama created for creating new database entry
var postMovie = require("../../models/movie");

router.use(ensureAuthenticatedAdmin);

router.get("/" , function(req,res){
    res.render("admin/admin", {title:"admin"});
});

router.get("/addMovie", function(req,res){
    res.render("admin/addMovie")
})
//add movie post to database
router.post("/addMovie", function(req, res){

    var newMovie = new postMovie({
        title:req.body.title,
        description:req.body.description,
        yearReleased:req.body.yearReleased,
        actors:req.body.actors,
        price: req.body.price,
        listedtimes: req.body.listedTimes
    });

    newMovie.save(function(err,post){
        if(err){console.log(err);}
        res.redirect("/admin");
    });

 });

module.exports = router;