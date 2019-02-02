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

module.exports = {
  addArticle
}