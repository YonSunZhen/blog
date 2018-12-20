var express = require('express');
var router = express.Router();
var managersModel = require('../database/Model/managers');
var managersBll = require('../database/BLL/managers');

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
//管理员表获取数据
router.get('/getManagersAllData',function(req,res,next){
  managersBll.getManagersAllData(function(result){
    let code = 0;
    let message = "";
    let count = result.length;
    let data = result;
    let obj = {
      "code":0,
      "msg":"",
      "count":count,
      "data":data
    };
    res.json(obj);
  })
})
//Managers删除一条数据
router.post('/delManagersOneData',function(req,res,next){//req,res,next这几个参数的位置不可以变
  let id = req.body.id;
  managersBll.delManagersOneData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});

router.get('/manager', function(req, res, next) {
  res.render('manager', { title: 'Hey', message: '这是用户管理页面'});
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