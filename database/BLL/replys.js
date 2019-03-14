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
//根据评论id获取一条评论的所有通过的回复
let getReplysByCommentIDState1 = (cb,comment_id) => {
  apiModel.getReplysByCommentIDState1(comment_id).then((result) => {
    return cb(result);
  })
}
//根据id删除一条回复
let delReply = (cb,id) => {
  apiModel.delReply(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据id更改state
let updateReplyState = (cb,id,state) => {
  apiModel.updateReplyState(id,state).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

module.exports = {
  addReply,
  getReplysByCommentID,
  delReply,
  updateReplyState,
  getReplysByCommentIDState1
}