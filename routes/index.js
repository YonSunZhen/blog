var express = require('express');
var router = express.Router();
var apiModel = require('../database/BLL/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.logined);
  if(req.session.logined){
    res.render('index', { title: 'Express' });
  }else{
    res.redirect('/');
  }
});
//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Hey', message: '这是测试页面'});
});

module.exports = router;