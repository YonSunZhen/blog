var express = require('express');
var router = express.Router();
var apiModel = require('../database/BLL/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  let userName = req.body.username;
  let password = req.body.password;
  //验证用户是否已存在
  apiModel.isExist(function(data){
    if(data === "true"){
      res.send("用户名已存在，请重新输入!");
    }else{
      apiModel.addUser(function(data){
        if(data === "true"){
          res.send("注册成功！");
        }
      },userName,password)
    }
  },userName)
  // res.redirect('/');
});

router.post('/login', function(req, res, next) {
  let userName = req.body.username;
  let password = req.body.password;
  apiModel.findUser(function(data){
    if(data === "true"){
      console.log(data);
      res.send("登录成功");
    }else{
      console.log(data);
      res.send("账户不存在或密码错误!");
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

module.exports = router;
