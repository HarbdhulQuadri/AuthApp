var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
session = require('express-session');
passport =require("passport");
expressValidator = require('express-validator');
localStrategy = require(passport-local).Strategy;
multer = require("multer");
var upload = multer({dest :"./uploads"})
flash= require("connect-flash");
var mongoose = require(mongoose);
//connecting to cloud mongoose
db = mongoose.connect('mongodb+srv://admin:ishola96@cluster0.pi2rw.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas!');
  console.error(error);
});



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { session } = require('passport');
const passport = require('passport');
const multer = require('multer');

var app = express();
// handling file uploads
app.use(multer({dest :"./uploads"}));
//handle session 
app.use(session({
  secret:'secret',
  saveUnitialized:true,
  resave: true,
}));
//passport authentication 
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//connect flash 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
