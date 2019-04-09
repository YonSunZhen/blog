var apiModel = require("../DbHelper");

//增加一篇文章
let addArticle = (id,mid,articleName,tid,content,state,createDate,createPeople,updateDate) => {
  let _sql = `insert into articles set 
              id="${id}",
              mid="${mid}",
              articleName="${articleName}",
              tid="${tid}",
              content="${content}",
              state="${state}",
              createDate="${createDate}",
              updateDate="${updateDate}",
              createPeople="${createPeople}"`;
  return apiModel.query(_sql);
}
//获取Articles所有数据(超管显示使用的,连接types表,获得typeName)
let getArticlesAllData = (first,limit) => {
  let _sql = `select a.id,a.mid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from articles a left JOIN types b on a.tid=b.id ORDER BY updateDate DESC limit ${first},${limit};`
  return apiModel.query(_sql);
}
//获取Articles部分数据(普管显示使用的，连接types表,获得typeName)
let getArticlesDataByUser = (userName,first,limit) => {
  let _sql = `select a.id,a.mid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from articles a left JOIN types b on a.tid=b.id
              where a.createPeople="${userName}" ORDER BY updateDate DESC limit ${first},${limit};`
  return apiModel.query(_sql);
}
//获取Articles部分数据(state为1,普通用户使用)
let getArticlesDataByState = (limit) => {
  let _sql = `select a.id,a.mid,a.tid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from articles a left JOIN types b on a.tid=b.id
              where a.state=1 ORDER BY a.updateDate DESC limit 0,${limit};`//降序,查找0到3的数据
  return apiModel.query(_sql);
}
//根据文章类型id获取Articles部分数据(state为1,普通用户使用)(有问题)
let getArticlesDataByTypeId = (limit,typeId) => {
  let _sql = `select a.id,a.mid,a.tid,a.articleName,a.content,a.state,a.createDate,a.createPeople,a.updateDate,a.updatePeople,a.readCount,b.typeName
              from articles a left JOIN types b on a.tid=b.id
              where a.state=1 AND a.tid=${typeId} ORDER BY a.updateDate DESC limit 0,${limit};`//降序,查找0到3的数据
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delArticlesOneData = (id) => {
  let _sql = `delete from articles where id="${id}";`
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
  let _sql = `select a.*,b.typeName
              from articles a left JOIN types b on a.tid=b.id
              where a.id="${id}";`
  return apiModel.query(_sql);
}
//更改Articles中的阅读数
let updateArticleReadCount = (id,readCount) => {
  let _sql = `update articles set 
              readCount="${readCount}"
              where id="${id}";
              `
  return apiModel.query(_sql); 
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