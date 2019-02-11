var apiModel = require("../DbHelper");

//增加一篇文章
let addArticle = (id,mid,articleName,typeName,content,state,createDate,createPeople) => {
  let _sql = `insert into articles set 
              id="${id}",
              mid="${mid}",
              articleName="${articleName}",
              typeName="${typeName}",
              content="${content}",
              state="${state}",
              createDate="${createDate}",
              createPeople="${createPeople}"`;
  return apiModel.query(_sql);
}
//获取Articles所有数据(超管显示使用的)
let getArticlesAllData = () => {
  let _sql = `select * from Articles;`
  return apiModel.query(_sql);
}
//获取Articles部分数据(普管显示使用的)
let getArticlesDataByUser = (userName) => {
  let _sql = `select * from Articles where createPeople="${userName}";`
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delArticlesOneData = (id) => {
  let _sql = `delete from Articles where id="${id}";`
  return apiModel.query(_sql);
}

module.exports = {
  addArticle,
  getArticlesAllData,
  getArticlesDataByUser,
  delArticlesOneData
}