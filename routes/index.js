var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/auth/github", passport.authenticate('github'));

router.get("/auth/github/callback", 
  passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/users")
  }
)

module.exports = router;
