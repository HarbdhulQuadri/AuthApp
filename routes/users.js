var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});
router.get('/login', function(req, res, next) {
  res.render('login',{title:"Login"});
});
router.post('/register',upload.single('profileImage'),function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

});

module.exports = router;
