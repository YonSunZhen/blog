var express = require('express');
var router = express.Router();
var apiModel = require('../database/BLL/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.logined);
  if(req.session.logined){
    if(req.session.username === "superAdmin"){
      res.render('index', { title: 'Express',superAdmin: true});
    }else{
      res.render('index', { title: 'Express',superAdmin: false});
    }  
  }else{
    res.redirect('/');
  }
});
//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Hey', message: '这是用户管理页面'});
});

router.get('/article', function(req, res, next) {
  res.render('article', { title: 'Hey', message: '这是文章管理页面'});
});

router.get('/type', function(req, res, next) {
  res.render('type', { title: 'Hey', message: '这是文章类型管理页面'});
});

router.get('/comment', function(req, res, next) {
  res.render('comment', { title: 'Hey', message: '这是评论管理页面'});
});

module.exports = router;