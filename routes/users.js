var express = require('express');
var router = express.Router();
var router = express.Router();
var { body, validationResult} = require('express-validator');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var User = require('../models/user');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});
router.get('/login', function(req, res, next) {
  res.render('login',{title:"Login"});
});
router.post('/register',upload.single('profileimage'),function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
if (req.file){
 console.log('File Uploading ');
 var profileimage= req.file.filename;
}else{
  console.log('no file uploaded');
  var profileimage = 'noimage.jpg'
}
//Validating Form 
body('name','name is required').notEmpty();
body('email','name is required').notEmpty();
body('email','name is required').isEmail();
body('username','name is required').notEmpty();
body('password','name is required').notEmpty();
body('password2','Password do not match').equals(req.body.password);

//Check Errors
const errors = validationResult(req);
if (errors){
  res.render('register',{
    errors :errors
  })
}else{
  var newUser = new User({
    name :name,
    email:email,
    username:username,
    password:password,
    profileimage:profileimage


  });
  User.createUser(newUser,function(err,user){
    if (err) throw err;
    console.log(user);
  });
  res.location('/');
  res.redirect('/')
}
});

module.exports = router;
