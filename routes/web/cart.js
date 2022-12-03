var express = require("express");
var Post = require("../../models/movie");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated
var router = express.Router();
router.use(ensureAuthenticated);
//get the index of customer
router.get("/" , function(req,res){
    Post.find(req.params.movieID).exec(function(err, post){
        if(err){console.log(err)}
        res.render("customer/cart", {post: post});
    });
});
module.exports = router;