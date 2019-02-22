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
  let _sql = `select * from Replys where comment_id="${comment_id}"`;
  return apiModel.query(_sql);
}

module.exports = {
  addReply,
  getReplysByCommentID
}