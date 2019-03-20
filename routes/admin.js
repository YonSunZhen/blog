var express = require('express');
var router = express.Router();
var time = require('silly-datetime');
var usersModel = require('../database/Model/users');
var usersBll = require('../database/BLL/users');
var uuidv1 = require('uuid/v1');
var crypto = require("crypto");



function crossDomain(res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Connection,User-Agent,Cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,TRACE,OPTIONS,DELETE");
  // res.header("X-Powered-By", "Jetty");
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
//注册路由
router.post('/register', function(req, res, next) {
  crossDomain(res)
  let id = uuidv1();
  console.log(id);
  let userName = req.body.username;
  let passWord1 = req.body.password;
  let md5 = crypto.createHash("md5");
  console.log(md5);
  let passWord = md5.update(passWord1).digest("hex");
  let mobile = req.body.mobile;
  let power;
  if(req.body.power){
    power = req.body.power;
  }else{
    power = null;
  }
  let remark = req.body.remark;
  let state;
  if(req.body.state){
    state = req.body.state;
  }else{
    state = 0;//默认状态为0(未通过)
  }
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let type = req.body.type;//0表示管理员，1表示普通用户
  // let model = {
  //   "userName":userName,
  //   "passWord":passWord,
  //   "state":state,
  //   "mobile":mobile,
  //   "createDate":createDate
  // };
  let userData = new usersModel.Users(userName,mobile,state,power,remark,passWord,createDate,id,type);
  //验证用户是否已存在
  usersBll.isExist(function(data){
    if(data === "true"){
      // console.log("已存在");
      res.send("isExist");
    }else{
      usersBll.addUser(function(data){
        if(data === "true"){
          // console.log("成功");
          res.send("success");
        }else{
          // console.log("失败");
          res.send("fail");
        }
      },userData)
    }
  },userName,type)
});
//登录路由
router.post('/login', function(req, res, next) {
  crossDomain(res);
  //重新登录时清除先前的数据(如果存在的话)
  if(req.session.logined){
    req.session.logined = null;
  }
  if(req.session.username){
    req.session.username = null;
  }
  if(req.session.mName){
    req.session.mName = null;
  }
  if(req.session.mPassWord){
    req.session.mPassWors = null;
  }
  if(req.session.mType){
    req.session.mType = null;
  }
  //重新获取数据判断登录
  let userName = req.body.username;
  let password1 = req.body.password;
  let md5 = crypto.createHash("md5");//创建并返回一个哈希对象
  console.log(md5);
  let password = md5.update(password1).digest("hex");
  let type = req.body.type;
  usersBll.findUser(function(data){
    if(data.length > 0){
      //更新登录时间，上次登陆时间和登陆次数
      usersBll.getLoginDateAndLoginTimes(function(data){
        console.log(data[0]);
        let loginDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        //对登陆时间进行格式化
        let lastLoginDate = time.format(data[0].loginDate,'YYYY-MM-DD HH:mm:ss');
        //console.log(lastLoginDate);
        let loginTimes = data[0].loginTimes + 1;
        //将数据更新到用户
        usersBll.updateLogin(function(data){
          if(data === "true"){
            console.log("更新登录成功");
          }
        },loginDate,lastLoginDate,loginTimes,userName,password)
      },userName,password)

      req.session.logined = true;
      //记录登录的用户名和密码和用户类型
      req.session.mName = userName;
      req.session.mPassWord = password;
      req.session.mType = type;
      if(userName === "superAdmin"){
        req.session.username = "superAdmin";
      }
      // console.log("100");
      res.send("success");
    }else{
      res.send("fail");
    }
  },userName,password,type)
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
