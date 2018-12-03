var apiModel = require('../DAL/users');

//登录验证
var findUser = (cb, userName, password) => {
  //利用回调函数
  apiModel.findUser(userName,password).then((result) => {
    if(result.length > 0){
      console.log(result);
      return cb("true");
    }else{
      console.log(result);
      return cb("false");
    }
  })

  // return new Promise((resolve,reject) => {
  //   apiModel.findUser(userName,password).then((result) =>  {
  //     if(result.length > 0){
  //       console.log(result);
  //       resolve("true");
  //       // res.send("登录成功");
  //       // return true;
  //     }
  //   })
  // })
}

//验证用户名是否存在
var isExist = (cb, userName) => {
  //利用回调函数
  apiModel.isExist(userName).then((result) => {
    if(result.length > 0){
      console.log(result);
      return cb("true");
    }else{
      console.log(result);
      return cb("false");
    }
  })
}

//增加一个用户
var addUser = (cb, userName, password) => {
  apiModel.addUser(userName, password).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

module.exports = {
  addUser,
  isExist,
  findUser
}
