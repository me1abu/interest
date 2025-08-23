var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const post = require('./post');
const upload= require('./multer')

const localStrategy= require('passport-local');
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  // console.log(req.flash("error"));
  res.render('login', {error: req.flash("error")});

});

router.get('/profile', isLoggedIn, function(req,res){
  res.render("profile");
});

router.post('/upload', upload.single('file'), (req, res) =>{
  if(!req.file){
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully!')
});

router.post('/register', function(req, res){
  const { username, email, fullName } = req.body;
  const newUser = new userModel({ username, email, fullName });
  
  userModel.register(newUser, req.body.password).then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile')
    })
  })
  
});

router.post('/login', passport.authenticate('local', {
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash: true,
}))

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

  
});

router.get('/feed', function (req, res, next) {
  res.render('feed');
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/')
}

module.exports = router;
