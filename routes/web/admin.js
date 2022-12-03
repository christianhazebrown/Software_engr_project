var express = require("express");
var Post = require("../../models/movie");
var ensureAuthenticatedAdmin = require("../../auth/auth").ensureAdmin
var multer = require("multer")
var crypto = require("crypto")
var path = require("path")

var router = express.Router();
//require the scheama created for creating new database entry
var postMovie = require("../../models/movie");
//ensure the user thats longed in is an admin
router.use(ensureAuthenticatedAdmin);

var storage = multer.diskStorage({
    destination:'./uploads/images',
    filename: function(req,file,cb){
        crypto.pseudoRandomBytes(16,function(err,raw){
            cb(null,raw.toString('hex') + Date.now() + path.extname(file.originalname))
        })
    }
})

var upload = multer({storage: storage})
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
//edit and post movie
 router.post("/update", upload.single("image") ,async function(req,res){
    const post = await Post.findById(req.body.postid);
    
    post.title = req.body.title
    post.description = req.body.description
    post.yearReleased = req.body.yearReleased
    post.actors = req.body.actors
    post.price = req.body.price
    post.movieID = req.user.id
    post.istedtimes = req.body.listedTimes
    post.image = req.file.path

    try {
        let savePost = await post.save()
        console.log("post saved")
        res.redirect("/admin")
    } catch (err) {
        console.log("error happened")
        res.status(500).send(err)
    }

 })
//router parameter to get movie id
router.get("/:movieID", function(req,res){
    Post.findById(req.params.movieID).exec(function(err,post){
        res.render("admin/moviedetail",{post:post})
    })
})

router.get("/edit/:movieID", function(req,res){
    Post.findById(req.params.movieID).exec(function(err,post){
        res.render("admin/editmovie",{post:post})
    })
})

module.exports = router;