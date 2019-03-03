var express = require('express');
var router = express.Router();
var articlesBll = require('../database/BLL/articles');
var time = require('silly-datetime');//获取时间
var uuidv1 = require('uuid/v1');//生成36位guid

function crossDomain(res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Connection,User-Agent,Cookie");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,TRACE,OPTIONS,DELETE");
  // res.header("X-Powered-By", "Jetty");
}

//articles表显示数据（初始化表格）
router.post('/getArticlesDataByState',function(req,res,next){

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Headers","Content-Type,Origin,Accept");
//   res.header("Access-Control-Allow-Methods", "POST,GET,TRACE,OPTIONS");
//   res.header("X-Powered-By", "3.2.1");
  let limit = req.body.limit;
  crossDomain(res);
  articlesBll.getArticlesDataByState(function(result){
    // console.log(limit);
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

})

module.exports = router;