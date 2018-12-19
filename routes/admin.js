var express = require('express');
var router = express.Router();
var time = require('silly-datetime');
var usersModel = require('../database/Model/users');
var usersBll = require('../database/BLL/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
//注册路由
router.post('/register', function(req, res, next) {
  let userName = req.body.username;
  let password = req.body.password;
  let mobile = req.body.mobile;
  //默认状态为0(未通过)
  let state = 0;
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let userData = new usersModel.User(userName,password,state,mobile,createDate);
  //验证用户是否已存在
  usersBll.isExist(function(data){
    if(data === "true"){
      res.send("用户名已存在，请重新输入!");
    }else{
      usersBll.addUser(function(data){
        if(data === "true"){
          res.send("注册成功！");
        }
      },userData)
    }
  },userName)
});
//登录路由
router.post('/login', function(req, res, next) {
  //重新登录时清除先前的数据(如果存在的话)
  if(req.session.logined){
    req.session.logined = null;
  }
  if(req.session.username){
    req.session.username = null;
  }
  //重新获取数据判断登录
  let userName = req.body.username;
  let password = req.body.password;
  usersBll.findUser(function(data){
    if(data === "true"){
      req.session.logined = true;
      if(userName === "superAdmin"){
        req.session.username = "superAdmin";
      }
      res.send("success");
    }else{
      res.send("fail");
    }
  },userName,password)

  // if(apiModel.findUser(userName,password) === "true"){
  //   console.log(apiModel.findUser(userName,password));
  //   res.send("登录成功");
  // }else{
  //   console.log(apiModel.findUser(userName,password));
  //   res.send("账户不存在或密码错误!");
  // }

  // apiModel.findUser(userName,password).then((result) =>  {
  //   if(result.length > 0){
  //     console.log(result);
  //     res.send("登录成功");
  //   }else{
  //     console.log(result);
  //     res.send("账户不存在或密码错误!");
  //   }   
  // })
  // res.redirect('/');
});
//注销路由
router.get('/logout',function(req,res,next){
  req.session.logined = false;
  if(req.session.username){
    req.session.username = null;
  }
  //重新载入这个界面(相当于刷新)
  res.redirect('/index');
})

module.exports = router;
