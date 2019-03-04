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
  let _sql = `select one.*,Users.userName as to_userName from 
                (select r.*,m.userName as from_userName from Replys r left JOIN Users m on r.from_uid = m.id where comment_id="${comment_id}") 
              one left JOIN Users on one.to_uid = Users.id ORDER BY createDate`;//默认是升序
  return apiModel.query(_sql);
}
//根据id删除一条回复
let delReply = (id) => {
  let _sql = `delete from Replys where id="${id}";`
  return apiModel.query(_sql);
}
//根据id更改state 
let updateReplyState = (id,state) => {
  let _sql = `update Replys set state="${state}" where id="${id}";`
  return apiModel.query(_sql);
}

module.exports = {
  addReply,
  getReplysByCommentID,
  delReply,
  updateReplyState
}