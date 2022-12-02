var express = require("express");
var Post = require("../../models/movie");
var ensureAuthenticatedAdmin = require("../../auth/auth").ensureAdmin

var router = express.Router();
//require the scheama created for creating new database entry
var postMovie = require("../../models/movie");
//ensure the user thats longed in is an admin
router.use(ensureAuthenticatedAdmin);
//gets index of admin
router.get("/" , function(req,res){
    Post.find({movieID:req.user._id}).exec(function(err, post){
        if(err){console.log(err)}
        res.render("admin/admin", {post: post});
    });

});
// route to add new database entry for movie
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
        movieID: req.user.id,
        listedtimes: req.body.listedTimes
    });

    newMovie.save(function(err,post){
        if(err){console.log(err);}
        res.redirect("/admin");
    });

 });
//: router parameter to get movie id
//  router.get("/:movieID", function(req,res){
//     Post.findById(req.params.movieID).exec(function(err,post){
//         res.render("admin/moviedetail",{post:post})
//     })
// })

module.exports = router;