var apiModel = require("../DbHelper");

//获取Comments所有数据(超管初始化表格使用)
let getCommentsAllData = (first,limit) => {
  let _sql = `select two.id,two.articleName,two.article_content,two.comment_content,two.createDate,two.from_uid,two.typeName,two.state,two.articleAuthor,m.userName as commentUser
              from
                (select one.id,one.articleName,one.article_content,one.comment_content,one.createDate,one.from_uid,one.state,one.articleAuthor,t.typeName
                  from (select a.articleName,a.content as article_content,a.createPeople as articleAuthor,c.content as comment_content,c.createDate,c.type_id,c.id,c.from_uid,c.state
                      from comments c left JOIN articles a on c.article_id = a.id) one left JOIN types t on one.type_id = t.id) two left JOIN
                users m on two.from_uid = m.id ORDER BY two.createDate DESC limit ${first},${limit};`
  return apiModel.query(_sql);
}
//获取Comments所有数据(普管初始化表格使用，只能获取自己写的博客的评论)
let getCommentsByUser = (userName,first,limit) => {
  let _sql = `select two.id,two.articleName,two.article_content,two.comment_content,two.createDate,two.from_uid,two.typeName,two.state,two.articleAuthor,m.userName as commentUser
              from
                (select one.id,one.articleName,one.article_content,one.comment_content,one.createDate,one.from_uid,one.state,one.articleAuthor,t.typeName
                  from (select a.articleName,a.content as article_content,a.createPeople as articleAuthor,c.content as comment_content,c.createDate,c.type_id,c.id,c.from_uid,c.state
                      from comments c left JOIN articles a on c.article_id = a.id) one left JOIN types t on one.type_id = t.id) two left JOIN
                users m on two.from_uid = m.id
              where two.articleAuthor="${userName}" ORDER BY two.createDate DESC limit ${first},${limit};`
  return apiModel.query(_sql);
}
//获取所有被评论过的文章的信息(超管使用)
// let getCommentsAllData1 = () => {
//   let _sql = `select distinct article_id from Comments one left JOIN ;`
// }

//根据id删除一条评论
let delComment = (id) => {
  let _sql = `delete from comments where id="${id}";`
  return apiModel.query(_sql);
}
//根据id更新一条评论的state
let updateCommentState = (id,state) => {
  let _sql = `update comments set state="${state}" where id="${id}";`
  return apiModel.query(_sql); 
}
//根据文章id获取关于这篇文章的所有评论
let getCommentsByArticleId = (articleID) => {
  let _sql = `select c.*, u.userName as from_userName from comments c left JOIN users u on c.from_uid=u.id where c.article_id="${articleID}" AND c.state=1 ORDER BY createDate DESC;`
  return apiModel.query(_sql); 
}
//添加一条评论
let addOneComment = (id, articleID, typeID, content, state, from_uid, createDate) => {
  let _sql = `insert into comments set 
              id = "${id}",
              article_id="${articleID}",
              type_id="${typeID}",
              content="${content}",
              state="${state}",
              createDate="${createDate}",
              from_uid="${from_uid}";`
  return apiModel.query(_sql);
}

module.exports = {
  getCommentsAllData,
  getCommentsByUser,
  delComment,
  updateCommentState,
  getCommentsByArticleId,
  addOneComment
}