var express = require("express");
var Post = require("../../models/movie");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated
let cart = []
let i=0
var router = express.Router();
// ensure the user is logged in
router.use(ensureAuthenticated);

//get the index of customer
router.get("/" , function(req,res){
    Post.find(req.params.movieID).exec(function(err, post){
        if(err){console.log(err)}
        res.render("customer/catalog", {post: post});
    });
});
//request the id of the movie from database
router.get("/:post_id", function(req,res){
    Post.findById(req.params.post_id).exec(function(err, post){
        res.render("customer/view", {post: post})
    })
})

router.get("/cart/:post_id", function(req,res){
    cart[i] = req.params.post_id
    res.redirect("/catalog")
    i++
    console.log(cart)
})
module.exports = router;