var express = require('express');
var router = express.Router();
var managersModel = require('../database/Model/managers');
var managersBll = require('../database/BLL/managers');
var typesBll = require('../database/BLL/types');
var articlesBll = require('../database/BLL/articles');
var time = require('silly-datetime');
var uuidv1 = require('uuid/v1');
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
      res.render('index', { title: 'Express',superAdmin: true,username:req.session.mName});
    }else{
      res.render('index', { title: 'Express',superAdmin: false,username:req.session.mName});
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
  let power = req.body.power;
  let remark = req.body.remark;
  let userData = new managersModel.Managers(userName,mobile,state,power,remark);
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
//types表查询出所有通过的类型（注册管理员选择权限时使用）
router.get('/getTypesAdopt',function(req,res,next){
  typesBll.getTypesAdopt(function(result){
    console.log(result);
    let array = [];
    for(let i = 0;i < result.length;i++){
      array[i] = {
        "id" : result[i].id,
        "name" : result[i].typeName
      }
    }
    res.send(array);
  })
})

//articles表增加一条数据
router.post('/addOneArticle',function(req,res,next){
  managersBll.findManagerId(function(result){
    let id = uuidv1();
    let mid = result[0].id;
    let articleName = req.body.articleName;
    let tid = req.body.tid;
    let content = req.body.content;
    let state;
    if(req.session.mName === "superAdmin"){
      state = 1;//超管添加的文章默认状态通过
    }else{
      state = 0;//普通管理添加的文章由超管审批是否通过
    }
    let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let createPeople = result[0].userName;
    articlesBll.addArticle(function(result){
      if(result === "true"){
        res.send("success");
        //console.log("2333");
      }else{
        res.send("fail");
      }
    },id,mid,articleName,tid,content,state,createDate,createPeople)
    //console.log(result[0].id); 
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
//articles表显示数据（初始化表格）
router.get('/getArticlesAllData',function(req,res,next){
  //console.log("成功");
  if(req.session.mName === "superAdmin"){
    articlesBll.getArticlesAllData(function(result){
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
      //console.log("成功1");
      res.json(obj);
    })
  }else{
    articlesBll.getArticlesDataByUser(function(result){
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
    },req.session.mName)
  }
})
//Articles删除一条数据
router.post('/delArticlesOneData',function(req,res,next){
  let id = req.body.id;
  articlesBll.delArticlesOneData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//Articles更新一条数据
router.post('/updateArticleOneData',function(req,res,next){
  let id = req.body.id;
  //console.log(id);
  let articleName = req.body.articleName;
  let tid = req.body.tid;
  let content = req.body.content;
  let state = req.body.state;
  let updateDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let updatePeople = req.session.mName;
  articlesBll.updateArticleOneData(function(result){
    if(result === "true"){
      //console.log("成功");
      res.send("success");
    }else{
      //console.log("失败");
      res.send("fail");
    }
  },id,articleName,tid,content,state,updateDate,updatePeople)
})
//Articles根据id获取一条数据
router.post('/getArticleOneData',function(req,res,next){
  let id = req.body.id;
  articlesBll.getArticleOneData(function(result){
    res.send(result);
  },id)
})

//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});
router.get('/manager', function(req, res, next) {
  res.render('manager', { title: 'Hey', message: '这是用户管理页面'});
});
router.get('/addArticle', function(req, res, next) {
  let data = [];
  //如果是超管登录即可获取所有的文章类型
  if(req.session.mName === "superAdmin"){
    typesBll.getTypesAdopt(function(result){
      for(let i = 0; i < result.length; i++){
        data.push({
          'tid':result[i].id,
          'typeName':result[i].typeName
        });
      }
      data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
      res.render('addArticle', {data:data});
    })
  }else{//普管只能获取他特有的权限
    managersBll.getPowerByUser(function(result1){
      //将普管的power字段由字符串转化为数组
      if(result1[0].power.indexOf(",") == -1){
        typesBll.getTypesOneData(function(result){
          data[0] = {
            'tid':result1[0].power,
            'typeName':result[0].typeName
          };
          data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
          res.render('addArticle', {data:data});
        },result1[0].power)
      }else{
        let arr = result1[0].power.split(",");
        for(let i = 0;i < arr.length;i++){
          let typeName;
          typesBll.getTypesOneData(function(result){
            typeName = result[0].typeName;
            //console.log("8888");
            //console.log(typeName);
            data.push({
              'tid':arr[i],
              'typeName':typeName
            });
            data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
            //console.log("9999");
            //console.log(data);
            if(i == arr.length-1){
              res.render('addArticle', {data:data});
            }
          },arr[i])
        }
      }    
    },req.session.mName,req.session.mPassWord)
  }
});
//超级管理员类型管理页面
router.get('/typeSuper', function(req, res, next) {
  res.render('typeSuper', { title: 'Hey', message: '这是管理员类型管理页面'});
});
//普通管理员类型管理页面
router.get('/typeAdmin', function(req, res, next) {
  res.render('typeAdmin', { title: 'Hey', message: '这是普通管理员类型管理页面'});
});
router.get('/manageArticle', function(req, res, next) {
  let data = [];
  //如果是超管登录即可获取所有的文章类型
  if(req.session.mName === "superAdmin"){
    typesBll.getTypesAdopt(function(result){
      for(let i = 0; i < result.length; i++){
        data.push({
          'tid':result[i].id,
          'typeName':result[i].typeName
        });
      }
      data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
      res.render('manageArticle', {data:data});
    })
  }else{//普管只能获取他特有的权限
    managersBll.getPowerByUser(function(result1){
      //将普管的power字段由字符串转化为数组
      if(result1[0].power.indexOf(",") == -1){
        typesBll.getTypesOneData(function(result){
          data[0] = {
            'tid':result1[0].power,
            'typeName':result[0].typeName
          };
          data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
          res.render('manageArticle', {data:data});
        },result1[0].power)
      }else{
        let arr = result1[0].power.split(",");
        for(let i = 0;i < arr.length;i++){
          let typeName;
          typesBll.getTypesOneData(function(result){
            typeName = result[0].typeName;
            //console.log("8888");
            //console.log(typeName);
            data.push({
              'tid':arr[i],
              'typeName':typeName
            });
            data.push(req.session.mName);//判断更改文章框是否出现状态文本框使用（只有超管有）
            //console.log("9999");
            //console.log(data);
            if(i == arr.length-1){//获取完最后一个时渲染页面
              res.render('manageArticle', {data:data});
            }
          },arr[i])
        }
      }    
    },req.session.mName,req.session.mPassWord)
  }
});
router.get('/comment', function(req, res, next) {
  res.render('comment', { title: 'Hey', message: '这是评论管理页面'});
});

module.exports = router;