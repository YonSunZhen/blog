var apiModel = require("../DAL/articles");

//增加一篇文章
let addArticle = (cb,id,mid,articleName,tid,content,state,createDate,createPeople,updateDate) => {
  apiModel.addArticle(id,mid,articleName,tid,content,state,createDate,createPeople,updateDate).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//获取Articles所有数据(超管显示使用的)
let getArticlesAllData = (cb,first,limit) => {  
  apiModel.getArticlesAllData(first,limit).then((result) => {
    return cb(result);
  })
}
//获取Articles部分数据(普管显示使用的)
let getArticlesDataByUser = (cb,userName,first,limit) => {
  apiModel.getArticlesDataByUser(userName,first,limit).then((result) => {
    return cb(result);
  })
}
//获取Articles部分数据(state为1的数据,普通用户使用)
let getArticlesDataByState = (cb,limit) => {
  apiModel.getArticlesDataByState(limit).then((result) => {
    return cb(result);
  })
}
//根据文章类型id获取Articles部分数据(state为1,普通用户使用)
let getArticlesDataByTypeId = (cb,limit,typeId) => {
  apiModel.getArticlesDataByTypeId(limit,typeId).then((result) => {
    return cb(result);
  })
}
//根据id删除一条数据
let delArticlesOneData = (cb,id) => {
  apiModel.delArticlesOneData(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//更改Articles中的一条数据
let updateArticleOneData = (cb,id,articleName,tid,content,state,updateDate,updatePeople) => {
  apiModel.updateArticleOneData(id,articleName,tid,content,state,updateDate,updatePeople).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据id获取Articles中的一条数据
let getArticleOneData = (cb,id) => {
  apiModel.getArticleOneData(id).then((result) => {
    return cb(result);
  })
}
//更改Articles中的阅读数
let updateArticleReadCount = (cb,id,readCount) => {
  apiModel.updateArticleReadCount(id,readCount).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

module.exports = {
  addArticle,
  getArticlesAllData,
  getArticlesDataByUser,
  delArticlesOneData,
  updateArticleOneData,
  getArticleOneData,
  getArticlesDataByState,
  getArticlesDataByTypeId,
  updateArticleReadCount
}