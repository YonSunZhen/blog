var express = require('express');
var router = express.Router();
var articlesBll = require('../database/BLL/articles');
var typesBll = require('../database/BLL/types');
var commentsBll = require('../database/BLL/comments');
var usersModel = require('../database/Model/users');
var usersBll = require('../database/BLL/users');
var replysBll = require('../database/BLL/replys');
var time = require('silly-datetime');//获取时间
var uuidv1 = require('uuid/v1');//生成36位guid
var crypto = require("crypto");

function crossDomain(res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Connection,User-Agent,Cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,TRACE,OPTIONS,DELETE");
  // res.header("X-Powered-By", "Jetty");
}

//显示文章列表（渲染首页）
router.post('/getArticlesDataByState',function(req,res,next){
  crossDomain(res);
  let limit = req.body.limit;
  let state = req.body.state;
  let typeId = req.body.typeId;
  // console.log(state);
  if(state == 0){
    articlesBll.getArticlesDataByTypeId(function(result){
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
      res.send(data);
    },limit,typeId);
  }else{
    articlesBll.getArticlesDataByState(function(result){
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
      res.send(data);
    },limit)
  }

})

//显示类型列表（渲染首页）
router.get('/getTypesAdopt',function(req,res,next){
  crossDomain(res);
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

//Articles根据id获取一条数据
router.post('/getArticleOneData',function(req,res,next){
  crossDomain(res);
  let id = req.body.id;
  articlesBll.getArticleOneData(function(result){
    res.send(result);
  },id)
})

//根据文章id获取关于这篇文章的所有评论
router.post('/getCommentsByArticleId',function(req,res,next){
  crossDomain(res);
  let id = req.body.id;
  commentsBll.getCommentsByArticleId(function(result){
    res.send(result);
  },id)
})

//前台登录接口
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
  let password = md5.update(password1).digest("hex");
  let type = req.body.type;
  usersBll.findUser(function(data1){
    if(data1.length > 0){
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
      res.send({"data":data1,"state":"success"});
    }else{
      res.send({"data":'',"state":"fail"});
    }
  },userName,password,type)
});

//前台添加评论接口
router.post('/addOneComment',function(req,res,next){
  crossDomain(res);
  let id = uuidv1();
  let articleID = req.body.articleID;
  let typeID = req.body.typeID;
  let content = req.body.content;
  let state = 1;
  let from_uid = req.body.from_uid;
  let createDate = time.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  commentsBll.addOneComment(function(result){
    if(result == "true") {
      res.send("success");
    }else{
      res.send("fail");
    }
  },id, articleID, typeID, content, state, from_uid, createDate)
})

//对评论增加一条回复
router.post('/addReply',function(req,res,next){
  crossDomain(res);
  let comment_id = req.body.comment_id;
  let content = req.body.content;
  let to_uid = req.body.to_uid;
  let reply_type = req.body.reply_type;
  let from_uid = req.body.from_uid;
  let id = uuidv1();
  let reply_id;
  if(reply_type == '1'){//reply_type为1时，表示回复的是回复，reply_id等于回复的id
    console.log("5555")
    reply_id = req.body.reply_id;
  }else if(reply_type == '0'){//reply_type为0时，表示回复的是评论，reply_id等于评论的id
    console.log("出错了");
    reply_id = req.body.comment_id;
  }
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
})
//更新文章的阅读量
router.post('/updateArticleReadCount',function(req,res,next){
  crossDomain(res);
  let id = req.body.id;
  articlesBll.getArticleOneData(function(result1){
    let readCount = result1[0].readCount;
    console.log(readCount);
    readCount += 1;
    articlesBll.updateArticleReadCount(function(result){
      if(result == "true") {
        res.send("success");
      }else{
        res.send("fail");
      }
    },id, readCount)
  },id)
})

module.exports = router;