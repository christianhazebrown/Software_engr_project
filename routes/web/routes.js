var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
   res.render("index.ejs" , {title: "home"});
});

router.get("/catalog", function (req, res) {
   res.render("catalog.ejs" , {title: "catalog"});
});

router.get("/checkout", function (req, res) {
   res.render("checkout.ejs" , {title: "catalog"});
});


module.exports = router;