var apiModel = require("../DbHelper");

//增加一篇文章
let addArticle = (id,mid,articleName,tid,content,state,createDate,createPeople) => {
  let _sql = `insert into articles set 
              id="${id}",
              mid="${mid}",
              articleName="${articleName}",
              tid="${tid}",
              content="${content}",
              state="${state}",
              createDate="${createDate}",
              createPeople="${createPeople}"`;
  return apiModel.query(_sql);
}
//获取Articles所有数据(超管显示使用的,连接types表,获得typeName)
let getArticlesAllData = () => {
  let _sql = `select a.id,a.mid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from Articles a left JOIN Types b on a.tid=b.id;`
  return apiModel.query(_sql);
}
//获取Articles部分数据(普管显示使用的，连接types表,获得typeName)
let getArticlesDataByUser = (userName) => {
  let _sql = `select a.id,a.mid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from Articles a left JOIN Types b on a.tid=b.id
              where a.createPeople="${userName}";`
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delArticlesOneData = (id) => {
  let _sql = `delete from Articles where id="${id}";`
  return apiModel.query(_sql);
}
//更改Articles中的一条数据
let updateArticleOneData = (id,articleName,tid,content,state,updateDate,updatePeople) => {
  let _sql = `update articles set 
              articleName="${articleName}",
              tid="${tid}",
              content="${content}",
              updateDate="${updateDate}",
              state="${state}",
              updatePeople="${updatePeople}"
              where id="${id}";
              `
  return apiModel.query(_sql); 
}
//根据id获取Articles中的一条数据
let getArticleOneData = (id) => {
  let _sql = `select * from articles where id="${id}";`
  return apiModel.query(_sql);
}

module.exports = {
  addArticle,
  getArticlesAllData,
  getArticlesDataByUser,
  delArticlesOneData,
  updateArticleOneData,
  getArticleOneData
}