var express = require('express');
var router = express.Router();
var time = require('silly-datetime');
var managersModel = require('../database/Model/managers');
var managersBll = require('../database/BLL/managers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
//注册路由
router.post('/register', function(req, res, next) {
  let userName = req.body.username;
  let passWord = req.body.password;
  let mobile = req.body.mobile;
  let state;
  if(req.body.state){
    state = req.body.state;
  }else{
    state = 0;//默认状态为0(未通过)
  }
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  // let model = {
  //   "userName":userName,
  //   "passWord":passWord,
  //   "state":state,
  //   "mobile":mobile,
  //   "createDate":createDate
  // };
  let userData = new managersModel.Managers(userName,mobile,state,passWord,createDate);
  //验证用户是否已存在
  managersBll.isExist(function(data){
    if(data === "true"){
      res.send("用户名已存在，请重新输入!");
    }else{
      managersBll.addManager(function(data){
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
  managersBll.findManager(function(data){
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
