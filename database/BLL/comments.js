var apiModel = require('../DAL/comments');

//获取Comments所有数据(超管初始化表格使用)
let getCommentsAllData = (cb,first,limit) => {
  apiModel.getCommentsAllData(first,limit).then((result) => {
    return cb(result);
  })
}
//获取Comments所有数据(普管初始化表格使用，只能获取自己写的博客的评论)
let getCommentsByUser = (cb,userName,first,limit) => {
  apiModel.getCommentsByUser(userName,first,limit).then((result) => {
    return cb(result);
  })
}
//根据id删除一条评论
let delComment = (cb,id) => {
  apiModel.delComment(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据id更新一条评论的state
let updateCommentState = (cb,id,state) => {
  apiModel.updateCommentState(id,state).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据文章id获取关于这篇文章的所有评论
let getCommentsByArticleId = (cb,articleID) => {
  apiModel.getCommentsByArticleId(articleID).then((result) => {
    return cb(result);
  })
}

//添加一条评论
let addOneComment = (cb,id, articleID, typeID, content, state, from_uid, createDate) => {
  apiModel.addOneComment(id, articleID, typeID, content, state, from_uid, createDate).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

module.exports = {
  getCommentsAllData,
  getCommentsByUser,
  delComment,
  updateCommentState,
  getCommentsByArticleId,
  addOneComment
}