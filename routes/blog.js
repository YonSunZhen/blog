var express = require('express');
var router = express.Router();
var articlesBll = require('../database/BLL/articles');
var typesBll = require('../database/BLL/types');
var commentsBll = require('../database/BLL/comments');
var time = require('silly-datetime');//获取时间
var uuidv1 = require('uuid/v1');//生成36位guid

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

module.exports = router;