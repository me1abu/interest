var express = require('express');
var router = express.Router();
const userModel= require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/register", function(req, res, next){
  res.render('register');
})

router.post('/register', function(req, res, next){
  const data= new userModel({
    email: req.body.email,
    password: req.body.password,
    birthdate: req.body.birthdate,
  })
})

module.exports = router;
