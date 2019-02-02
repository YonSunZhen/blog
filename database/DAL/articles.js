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

module.exports = {
  addArticle
}