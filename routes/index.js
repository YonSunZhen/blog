var express = require('express');
var router = express.Router();
var usersModel = require('../database/Model/users');
var usersBll = require('../database/BLL/users');
var typesBll = require('../database/BLL/types');
var articlesBll = require('../database/BLL/articles');
var commentsBll = require('../database/BLL/comments');
var replysBll = require('../database/BLL/replys');
var time = require('silly-datetime');
var uuidv1 = require('uuid/v1');
var multer = require('multer');
var crypto = require("crypto");//密码加密处理

//跨域处理
function crossDomain(res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Connection,User-Agent,Cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,TRACE,OPTIONS,DELETE");
}

//配置上传文件时服务器文件夹的相关信息
var storage = multer.diskStorage({
  //如果destination是一个函数，必须手动创建上传文件夹
  destination:function(req,file,cb){
    //这里的路径名是基于整个项目目录的绝对路径
    cb(null,'./public/upload');
  },
  filename:function(req,file,cb){
    const filenameArr = file.originalname.split('.');
    cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
})
var upload = multer({storage:storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.logined);
  if(req.session.logined){
    if(req.session.username === "superAdmin"){
      res.render('index', { title: 'Express',superAdmin: true,userName:req.session.mName});
    }else{
      res.render('index', { title: 'Express',superAdmin: false,userName:req.session.mName});
    }  
  }else{
    res.redirect('/');
  }
});
//Users获取数据(管理员管理模块)
router.get('/getUsersAllDataType0',function(req,res,next){
  let page = req.query.page;
  let limit = req.query.limit;
  let first = 10 * (page - 1);
  // console.log(page);
  usersBll.getUsersAllDataType0(function(result0){
    let count = result0.length;
    usersBll.getUsersAllDataType0(function(result){
      let code = 0;
      let message = "";
      let data = result;
      let obj = {
        "code":0,
        "msg":"",
        "count":count,
        "data":data
      };
      res.json(obj);
    },first,limit);
  },0,100000)
})
//Users获取数据(普通用户管理模块)
router.get('/getUsersAllDataType1',function(req,res,next){
  let page = req.query.page;
  let limit = req.query.limit;
  let first = 10 * (page - 1);
  console.log(page);
  usersBll.getUsersAllDataType1(function(result0){
    let count = result0.length;
    usersBll.getUsersAllDataType1(function(result){
      let code = 0;
      let message = "";
      let data = result;
      let obj = {
        "code":0,
        "msg":"",
        "count":count,
        "data":data
      };
      res.json(obj);
    },first,limit);
  },0,100000)
})
//Users获取数据(管理员管理模块)有什么用？
router.get('/getUsersAllData',function(req,res,next){
  usersBll.getUsersAllDataType0(function(result){
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
//Users删除一条数据
router.post('/delUsersOneData',function(req,res,next){//req,res,next这几个参数的位置不可以变
  let id = req.body.id;
  usersBll.delUsersOneData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//更改Users中的一条数据
router.post('/updataUsersOneData',function(req,res,next){
  let id = req.body.id;
  let userName = req.body.username;
  let state = Number(req.body.state);
  let mobile = req.body.mobile;
  let type = req.body.type;
  console.log(type);
  let power;
  if(req.body.power){
    power = req.body.power;
  }else{
    power = null;
  }
  let remark = req.body.remark;
  let userData = new usersModel.Users(userName,mobile,state,power,remark);
  //console.log(userData);
  usersBll.isExist(function(result1){
    if(result1 === "true"){
      res.send("isExist");//返回请求数据
    }else{
      usersBll.updataUsersOneData(function(result){
        if(result === "true"){
          res.send("success");
        }else{
          res.send("fail");
        }
      },userData,id)
    }
  },userName,type)
})
//更改Users中的一条数据
router.post('/updataUsersOneData1',function(req,res,next){
  let id = req.body.id;
  let userName = req.body.username;
  let state = Number(req.body.state);
  let mobile = req.body.mobile;
  // let type = req.body.type;
  // console.log(type);
  let power;
  if(req.body.power){
    power = req.body.power;
  }else{
    power = null;
  }
  let remark = req.body.remark;
  let userData = new usersModel.Users(userName,mobile,state,power,remark);
  //console.log(userData);
  usersBll.updataUsersOneData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },userData,id)
})
//更改Users中的一条数据（更改个人信息用的）
router.post('/updataUsersOneData2',function(req,res,next){
  let userName = req.body.username;
  let mobile = req.body.mobile;
  let remark = req.body.remark;
  let id = req.body.id;
  //console.log(userData);
  usersBll.isExist(function(result1){
    if(result1 === "true"){
      res.send("isExist");//返回请求数据
    }else{
      usersBll.updataUsersOwnData(function(result){
        if(result === "true"){
          res.send("success");
        }else{
          res.send("fail");
        }
      },id,userName,mobile,remark)
    }
  },userName,req.session.mType)
})
//更改Users中的一条数据（更改个人信息用的）
router.post('/updataUsersOneData3',function(req,res,next){
  let userName = req.body.username;
  let mobile = req.body.mobile;
  let remark = req.body.remark;
  let id = req.body.id;
  usersBll.updataUsersOwnData(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id,userName,mobile,remark)
})
//更改用户密码
router.post('/updataUserPassword',function(req,res,next){
  let userName = req.body.username;
  let passWord1 = req.body.passWord;
  let passwordAgain1 = req.body.passwordAgain;
  let md51 = crypto.createHash("md5");//密码加密处理
  let passWord = md51.update(passWord1).digest("hex");//密码加密处理
  let md52 = crypto.createHash("md5");//密码加密处理
  let passwordAgain = md52.update(passwordAgain1).digest("hex");//密码加密处理
  let type = req.body.type;
  let id = req.body.id;
  usersBll.findUser(function(result0){
    if(result0.length > 0){
      usersBll.updataUserPassword(function(result){
        if(result === "true"){
          res.send("success");
        }else{
          res.send("fail");
        }
      },id,userName,passwordAgain)
    }else{
      res.send("error");
    }
  },userName,passWord,type)
})
router.post('/getModel',function(req,res,next){
  let id = req.body.id;
  usersBll.getModel(function(result){
    // console.log("haha");
    res.send(result);
  },id)
})

//types表查询所有数据
router.get('/getTypesAllData',function(req,res,next){
  //console.log("7777");
  //console.log(req.session.mName);
  //console.log(req.session.mPassWord);
  //console.log(req.session.mType);
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
  let createPeople = req.session.mName;
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let state;
  if(createPeople === "superAdmin"){
    state = 1;
  }else{
    state = 0;
  }
  let remark = req.body.remark;//添加时状态默认为不通过
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
  let updatePeople = req.session.mName;
  let updateDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  let state;
  if(req.session.mName === "superAdmin"){
    state = req.body.state;
  }else{
    state = 0;
  }
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
    //console.log(result);
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
  usersBll.findUserId(function(result){
    let id = uuidv1();
    let mid = result[0].id;
    let articleName = req.body.articleName;
    let tid = req.body.tid;
    let content = req.body.content;
    let state;
    // console.log(req.session.mName);
    if(req.session.mName === "superAdmin"){
      state = 1;//超管添加的文章默认状态通过
    }else{
      state = 0;//普通管理添加的文章由超管审批是否通过
    }
    let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    let updateDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    articlesBll.addArticle(function(result){
      if(result === "true"){
        res.send("success");
        //console.log("2333");
      }else{
        res.send("fail");
      }
    },id,mid,articleName,tid,content,state,createDate,req.session.mName,updateDate)
    //console.log(result[0].id); 
  },req.session.mName,req.session.mPassWord)
})
//上传图片到服务器
router.post('/uploadPic',upload.array('photo',10), function(req,res,next){
  console.log("图片上传成功");
  console.log(req.files);
  const array = [];
  for(let i = 0;i < req.files.length; i++){
    const arr = "/upload/" + req.files[i].filename;
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
  let page = req.query.page;
  let limit = req.query.limit;
  let first = 10 * (page - 1);
  if(req.session.mName === "superAdmin"){
    articlesBll.getArticlesAllData(function(result0){
      let count = result0.length;
      articlesBll.getArticlesAllData(function(result){
        let code = 0;
        let message = "";
        let data = result;
        let obj = {
          "code":0,
          "msg":"",
          "count":count,
          "data":data
        };
        //console.log("成功1");
        res.json(obj);
      },first,limit)
    },0,10000)
  }else{
    articlesBll.getArticlesDataByUser(function(result0){
      let count = result0.length;
      articlesBll.getArticlesDataByUser(function(result){
        let code = 0;
        let message = "";
        let data = result;
        let obj = {
          "code":0,
          "msg":"",
          "count":count,
          "data":data
        };
        //console.log("成功1");
        res.json(obj);
      },req.session.mName,first,limit)
    },req.session.mName,0,10000)
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

//Comments表显示数据(初始化表格)
router.get('/getCommentsAllData',function(req,res,next){
  let page = req.query.page;
  let limit = req.query.limit;
  let first = 10 * (page - 1);
  console.log(page);
  console.log(limit);
  console.log(first);
  if(req.session.mName === "superAdmin"){
    commentsBll.getCommentsAllData(function(result0){
      let count = result0.length;
      commentsBll.getCommentsAllData(function(result){
        // console.log(result);
        let code = 0;
        let message = "";
        let data = result;
        let obj = {
          "code":0,
          "msg":"",
          "count":count,
          "data":data
        };
        res.json(obj);
      },first,limit)
    },0,10000)
  }else{
    commentsBll.getCommentsByUser(function(result0){
      let count = result0.length;
      commentsBll.getCommentsByUser(function(result){
        // console.log(result);
        let code = 0;
        let message = "";
        let data = result;
        let obj = {
          "code":0,
          "msg":"",
          "count":count,
          "data":data
        };
        res.json(obj);
      },req.session.mName,first,limit)
    },req.session.mName,0,10000)
  }
})
//Comments表根据id删除一条评论
router.post('/delComment',function(req,res,next){
  crossDomain(res)
  let id = req.body.id;
  commentsBll.delComment(function(result){
    if(result == "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//Comments表更改一条评论的状态
router.post('/updateCommentState',function(req,res,next){
  let id = req.body.id;
  let state = req.body.state;
  commentsBll.updateCommentState(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id,state)
})

//Replys表添加一条数据
router.post('/addReply',function(req,res,next){
  usersBll.findUserId(function(result1){
    let from_uid = result1[0].id;
    let comment_id = req.body.comment_id;
    //console.log("2345");
    //console.log(comment_id);
    let content = req.body.content;
    let to_uid = req.body.to_uid;
    let reply_type = req.body.reply_type;
    //console.log("234");
    //console.log(reply_type);
    let id = uuidv1();
    let reply_id;
    if(reply_type == '1'){//reply_type为1时，表示回复的是回复，reply_id等于回复的id
      reply_id = req.body.reply_id;
    }else if(reply_type == '0'){//reply_type为0时，表示回复的是评论，reply_id等于评论的id
      //console.log("出错了");
      reply_id = req.body.comment_id;
    }
    //console.log("23456");
    //console.log(reply_id);
    let state = 1;
    let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    //当回复人和被回复人一样时
    if(from_uid == to_uid){
      res.send("error");
    }else{
      replysBll.addReply(function(result2){
        if(result2 === "true"){
          res.send("success");
        }else{
          res.send("fail");
        }
      },id,comment_id,reply_id,reply_type,content,state,from_uid,to_uid,createDate)
    }
  },req.session.mName,req.session.mPassWord);
})
//Replys表获取一条评论的所有回复
router.post('/getReplysByCommentID',function(req,res,next){
  crossDomain(res);
  let comment_id = req.body.comment_id;
  //console.log(comment_id);
  replysBll.getReplysByCommentID(function(result){
    //console.log("2222");
    //console.log(result);
    res.send(result);
  },comment_id)
})
//Replys表获取一条评论的所有通过的回复
router.post('/getReplysByCommentIDState1',function(req,res,next){
  crossDomain(res);
  let comment_id = req.body.comment_id;
  //console.log(comment_id);
  replysBll.getReplysByCommentIDState1(function(result){
    //console.log("2222");
    //console.log(result);
    res.send(result);
  },comment_id)
})
//Replys表删除一条数据
router.post('/delReply',function(req,res,next){
  crossDomain(res);
  let id = req.body.id;
  replysBll.delReply(function(result){
    if(result == "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id)
})
//Replys表更改状态
router.post('/updateReplyState',function(req,res,next){
  let id = req.body.id;
  let state = req.body.state;
  replysBll.updateReplyState(function(result){
    if(result === "true"){
      res.send("success");
    }else{
      res.send("fail");
    }
  },id,state)
})

//iframe框架的请求
router.get('/Mindex', function(req, res, next) {
  res.render('Mindex', { title: 'Hey', message: '这是首页'});
});
router.get('/manager', function(req, res, next) {
  res.render('manager', { title: 'Hey', message: '这是用户管理页面'});
});
router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Hey', message: '这是用户管理页面'});
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
    usersBll.getPowerByUser(function(result1){
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
    usersBll.getPowerByUser(function(result1){
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
  res.render('comment', {'test':'test'});
});

module.exports = router;