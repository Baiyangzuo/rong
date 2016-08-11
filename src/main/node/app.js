var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes');
var format = require('date-format');
var paths = require('./models/system/paths');
var app = express();

// 注册关键路径
paths(__dirname);

// logger reg time
logger.token('time', function getId(req) {
  return format('yyyy-MM-dd hh:mm:ss')
})

// view engine setup
// app.set('env', 'production')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('[:time] :remote-user :remote-addr :method :url HTTP/:http-version :status :res[content-length] referrer[:referrer]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'session_rong_name',
  secret: 'session_rong_secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1800000000
  }
}));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// reg routes
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('other/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('other/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
