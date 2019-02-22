let apiModel = require('../DAL/replys');

//增加一条回复(管理员回复评论使用)
let addReply = (cb,id,comment_id,reply_id,reply_type,content,state,from_uid,to_uid,createDate) => {
  apiModel.addReply(id,comment_id,reply_id,reply_type,content,state,from_uid,to_uid,createDate).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据评论id获取一条评论的所有回复
let getReplysByCommentID = (cb,comment_id) => {
  apiModel.getReplysByCommentID(comment_id).then((result) => {
    return cb(result);
  })
}

module.exports = {
  addReply,
  getReplysByCommentID
}