var express = require('express');
var router = express.Router();
const userModel= require('./users');
const passport = require('passport');
const localStrategy= require('passport-local');
const upload= require('./multer');


passport.use(new localStrategy({usernameField: 'email' }, userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('profile');
})

router.get('/editprofile', isLoggedIn, function(req, res, next){
  res.render('editprofile');
})

router.post('/fileupload', isLoggedIn, upload.single('image'), (req,res)=>{
  if(!req.file){
    return res.status(404).send('no files uploades');
  }
  res.send('file uploaded sucessfully');
});

router.get("/register", function(req, res, next){
  res.render('register');
})

router.post('/register', function(req, res, next){
  const data= new userModel({
    email: req.body.email,
    birthdate: req.body.birthdate,
  })

  userModel.register(data, req.body.password).then(function(){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile')
    })
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function(req, res){ }) 

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}



module.exports = router;
