var mongoose = require("mongoose");
const router = require("../routes/web");

//movie schema for posts
var movieSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    yearReleased:{type:String, required:false},
    actors:{type:String, required:false},
    price:{type:String, required:true},
    listedtimes:{type:String, required: true},
});

var moviePost = mongoose.model("movies", movieSchema);

module.exports = moviePost;