var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLogin = require('./routes/login');
var checkEmail = require('./routes/checkEmail');
var createAccount = require('./routes/createAccount')

var app = express();

var mysql = require("mysql")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// database setup
app.use(function(req, res, next){
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'skripsi'
  });
  res.locals.connection.connect();
  next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', userLogin);
app.use('/validate-email', checkEmail);
app.use('/create-account', createAccount);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var http = require('http')
module.exports = app;
var server = http.createServer(app);
server.listen(3001);
