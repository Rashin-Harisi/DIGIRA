var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const connectDB = require("./lib/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reg_form = require('./routes/regform')
var signup = require('./routes/signup')
const verification = require('./routes/verification')
const verifyotp = require('./routes/verifyotp')



var app = express();
app.use(cors());
app.use(express.json());


connectDB()

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
app.use('/regform', reg_form);
app.use('/verification',verification)
app.post('/signup', signup)
app.post('/verifyotp', verifyotp)




app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

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
