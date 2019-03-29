var apiModel = require("../DbHelper");

//增加一条回复(管理员回复评论使用)
let addReply = (id,comment_id,reply_id,reply_type,content,state,from_uid,to_uid,createDate) => {
  let _sql = `insert into replys set 
              id="${id}",
              comment_id="${comment_id}",
              reply_id="${reply_id}",
              reply_type="${reply_type}",
              content="${content}",
              state="${state}",
              from_uid="${from_uid}",
              to_uid="${to_uid}",
              createDate="${createDate}"`;
  return apiModel.query(_sql);
}
//根据评论id获取一条评论的所有回复
let getReplysByCommentID = (comment_id) => {
  let _sql = `select one.*,users.userName as to_userName from 
                (select r.*,m.userName as from_userName from replys r left JOIN users m on r.from_uid = m.id where comment_id="${comment_id}") 
              one left JOIN users on one.to_uid = users.id ORDER BY createDate`;//默认是升序
  return apiModel.query(_sql);
}
//根据评论id获取一条评论的所有通过的回复
let getReplysByCommentIDState1 = (comment_id) => {
  let _sql = `select one.*,users.userName as to_userName from 
                (select r.*,m.userName as from_userName from replys r left JOIN Users m on r.from_uid = m.id where comment_id="${comment_id}") 
              one left JOIN users on one.to_uid = users.id where one.state=1 ORDER BY createDate`;//默认是升序
  return apiModel.query(_sql);
}
//根据id删除一条回复
let delReply = (id) => {
  let _sql = `delete from replys where id="${id}";`
  return apiModel.query(_sql);
}
//根据id更改state 
let updateReplyState = (id,state) => {
  let _sql = `update replys set state="${state}" where id="${id}";`
  return apiModel.query(_sql);
}

module.exports = {
  addReply,
  getReplysByCommentID,
  delReply,
  updateReplyState,
  getReplysByCommentIDState1
}