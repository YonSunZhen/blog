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

module.exports = {
  getCommentsAllData,
  getCommentsByUser
}