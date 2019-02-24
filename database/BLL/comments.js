var apiModel = require('../DAL/comments');

//获取Comments所有数据(超管初始化表格使用)
let getCommentsAllData = (cb) => {
  apiModel.getCommentsAllData().then((result) => {
    return cb(result);
  })
}
//获取Comments所有数据(普管初始化表格使用，只能获取自己写的博客的评论)
let getCommentsByUser = (cb,userName) => {
  apiModel.getCommentsByUser(userName).then((result) => {
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

module.exports = {
  getCommentsAllData,
  getCommentsByUser,
  delComment,
  updateCommentState
}