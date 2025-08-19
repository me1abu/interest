var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const post = require('./post');

const localStrategy= require('passport-local');
const passport = require('passport');
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, function(req,res){
  res.send("Welcome to your profile page");
});

router.post('/register', function(req, res){
  const { username, email, fullName } = req.body;
  const newUser = new userModel({ username, email, password, fullName });
  
  userModel.register(newUser, req.body.password).then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile')
    })
  })
  
});

router.post('/login', passport.authenticate('local', {
  successRedirect:'/profile',
  failureRedirect:'/'
}))

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

  
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/')
}

module.exports = router;
