var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const URL = require('url');
var indexRouter = require('./routes/index');//后台管理接口
var adminRouter = require('./routes/admin');//后台登录注册接口
var blogRouter = require('./routes/blog');//前台博客展示模块

var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  // //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  const origin = URL.parse(req.headers['origin'] || req.headers['referer'] || '');
  console.log(origin);
  res.header('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Connection,User-Agent,Cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,TRACE,OPTIONS,DELETE");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat'
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/index', indexRouter);
app.use('/blog',blogRouter);
// app.use('/users', usersRouter);

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
