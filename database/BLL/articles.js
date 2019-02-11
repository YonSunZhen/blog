var apiModel = require("../DAL/articles");

//增加一篇文章
let addArticle = (cb,id,mid,articleName,typeName,content,state,createDate,createPeople) => {
  apiModel.addArticle(id,mid,articleName,typeName,content,state,createDate,createPeople).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//获取Articles所有数据(超管显示使用的)
let getArticlesAllData = (cb) => {  
  apiModel.getArticlesAllData().then((result) => {
    return cb(result);
  })
}
//获取Articles部分数据(普管显示使用的)
let getArticlesDataByUser = (cb,userName) => {
  apiModel.getArticlesDataByUser(userName).then((result) => {
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

module.exports = {
  addArticle,
  getArticlesAllData,
  getArticlesDataByUser,
  delArticlesOneData
}