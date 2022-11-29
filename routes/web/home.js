var express = require("express");
var router = express.Router();
var passport = require("passport");

var User = require("../../models/user");
//get the index,ejs
router.get("/", function (req, res) {
   res.render("index.ejs" , {title: "home"});
});
//get catalog,ejs
router.get("/catalog", function (req, res) {
   res.render("catalog.ejs" , {title: "catalog"});
});
//get checkout.ejs
router.get("/checkout", function (req, res) {
   res.render("checkout.ejs" , {title: "checkout"});
});
//get cart.ejs
router.get("/cart", function (req, res) {
   res.render("cart.ejs" , {title: "cart"});
});
//get login.ejs
router.get("/login", function (req, res) {
   res.render("login.ejs" , {title: "login"});
});
//get signup.ejs
router.get("/signup", function (req, res) {
   res.render("signup.ejs" , {title: "signup"});
});
//check user signup credentials
router.post("/signup", function (req, res, next) {
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;

   User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err); }
      if (user) {
         req.flash("error", "There's already an account with this email");
         return res.redirect("/signup");
      }

      var newUser = new User({
         username: username,
         password: password,
         email: email
      });

      newUser.save(next);

   });

}, passport.authenticate("login", {
   successRedirect: "/",
   failureRedirect: "/signup",
   failureFlash: true
}));

router.get("/admin", function (req, res) {
   res.render("admin.ejs" , {title: "admin"});
});
module.exports = router;