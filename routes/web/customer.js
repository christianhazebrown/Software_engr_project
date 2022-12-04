var express = require("express");
var Post = require("../../models/movie");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated
let cart = []
var display = []
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

router.get("/cart" , function(req,res){
    for(i=0;i <=cart.length-1;i++){
        Post.findById(cart[i]).exec(function(err, post){
            //console.log(post)
            if(err){console.log(err)}
            display[i] = post
            console.log("display:", display[i])
        });
        // console.log("display:", display[0])
    res.render("customer/cart", {display: display});
    }


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
    //console.log(cart)
})
module.exports = router;