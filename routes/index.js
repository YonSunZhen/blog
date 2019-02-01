var express = require('express');
var router = express.Router();
var managersModel = require('../database/Model/managers');
var managersBll = require('../database/BLL/managers');
var typesBll = require('../database/BLL/types');
var time = require('silly-datetime');
var multer = require('multer');
//配置上传文件时服务器文件夹的相关信息
var storage = multer.diskStorage({
  //如果destination是一个函数，必须手动创建上传文件夹
  destination:function(req,file,cb){
    cb(null,'public/upload');
  },
  filename:function(req,file,cb){
    const filenameArr = file.originalname.split('.');
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
})
var upload = multer({storage:storage});

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
//Managers获取数据
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
//更改Managers中的一条数据
router.post('/updataManagersOneData',function(req,res,next){
  let id = req.body.id;
  let userName = req.body.username;
  let state = Number(req.body.state);
  let mobile = req.body.mobile;
  let userData = new managersModel.Managers(userName,mobile,state);
  console.log(userData);
  managersBll.updataManagersOneData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },userData,id)
})
//根据id获取模型(Managers表)
router.post('/getModel',function(req,res,next){
  let id = req.body.id;
  managersBll.getModel(function(result){
    // console.log("haha");
    res.send(result);
  },id)
})

//types表查询所有数据
router.get('/getTypesAllData',function(req,res,next){
  console.log("7777");
  console.log(req.session.mName);
  console.log(req.session.mPassWord);
  typesBll.getTypesAllData(function(result){
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
//types表增加一条数据
router.post('/addType',function(req,res,next){
  let typeName = req.body.typeName;
  let createPeople = req.body.createPeople;
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let remark = req.body.remark;
  let state = 0;//添加时状态默认为不通过
  typesBll.addType(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },typeName,createPeople,createDate,remark,state)
})
//types表删除一条数据
router.post('/deleteType',function(req,res,next){
  let id = req.body.id;
  typesBll.deleteType(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//types表根据id查询一条数据
router.post('/getTypesOneData',function(req,res,next){
  let id = req.body.id;
  typesBll.getTypesOneData(function(result){
    res.send(result);
  },id)
})
//types表更新一条数据
router.post('/updateType',function(req,res,next){
  let id = req.body.id;
  let typeName = req.body.typeName;
  let updatePeople = req.body.updatePeople;
  let updateDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let state = req.body.state;
  let remark = req.body.remark;
  typesBll.updateType(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id,typeName,updateDate,updatePeople,state,remark)
})

//articles表增加一条数据
router.post('/addOneArticle',function(req,res,next){
  managersBll.findManagerId(function(result){
    console.log("2333");
    console.log(result[0].id);
    res.send("success");
  },req.session.mName,req.session.mPassWord)
})
//上传图片到服务器
router.post('/uploadPic',upload.array('photo',10), function(req,res,next){
  //console.log("图片上传成功");
  //console.log(req.files);
  const array = [];
  for(let i = 0;i < req.files.length; i++){
    const arr = "http://localhost:3000/upload/" + req.files[i].filename;
    array.push(arr);
  }
  const picData = {
    "errno": 0,
    "data": array
  }
  res.send(picData);
})

//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});
router.get('/manager', function(req, res, next) {
  res.render('manager', { title: 'Hey', message: '这是用户管理页面'});
});
router.get('/addArticle', function(req, res, next) {
  res.render('addArticle', { title: 'Hey', message: '这是添加文章页面'});
});
//超级管理员类型管理页面
router.get('/typeSuper', function(req, res, next) {
  res.render('typeSuper', { title: 'Hey', message: '这是管理员类型管理页面'});
});
//普通管理员类型管理页面
router.get('/typeAdmin', function(req, res, next) {
  res.render('typeAdmin', { title: 'Hey', message: '这是普通管理员类型管理页面'});
});
router.get('/comment', function(req, res, next) {
  res.render('comment', { title: 'Hey', message: '这是评论管理页面'});
});

module.exports = router;