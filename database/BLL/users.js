var apiModel = require('../DAL/users');

//登录验证
var findUser = (cb, userName, password, type) => {
  //利用回调函数
  apiModel.findUser(userName,password, type).then((result) => {
    if(result.length > 0 && result[0].state === 1){
      console.log(result[0]);
      return cb(result);
    }else{
      // console.log(result);
      return cb(result);
    }
  })
}

//验证用户名是否存在
var isExist = (cb, userName, type) => {
  //利用回调函数
  apiModel.isExist(userName, type).then((result) => {
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
var addUser = (cb, model) => {
  apiModel.addUser(model).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

//获取Users所有数据(管理员管理模块)
var getUsersAllDataType0 = (cb) => {
  apiModel.getUsersAllDataType0().then((result) => {
    return cb(result);
  })
}

//获取Users所有数据(普通用户管理模块)
var getUsersAllDataType1 = (cb) => {
  apiModel.getUsersAllDataType1().then((result) => {
    return cb(result);
  })
}
//根据id删除一条数据
var delUsersOneData = (cb,id) => {
  apiModel.delUsersOneData(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//更改Users中的一条数据
var updataUsersOneData = (cb,model,id) => {
  apiModel.updataUsersOneData(model,id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据id获取一条数据(模型)
var getModel = (cb,id) => {
  apiModel.getModel(id).then((result) => {
    return cb(result);
  })
}
//根据用户名和密码查找出登陆时间和登陆次数
var getLoginDateAndLoginTimes = (cb,userName,passWord) => {
  apiModel.getLoginDateAndLoginTimes(userName,passWord).then((result) => {
    return cb(result);
  })
}
//更新用户的登陆时
var updateLogin = (cb,loginDate,lastLoginDate,loginTimes,userName,passWord) => {
  apiModel.updateLogin(loginDate,lastLoginDate,loginTimes,userName,passWord).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据用户名和密码得到用户id（用户articles表的mid）
var findUserId = (cb, userName, password) => {
  //利用回调函数
  apiModel.findUser(userName,password).then((result) => {
    return cb(result);
  })
}
//根据普通管理员用户名和密码获取普管的权限
var getPowerByUser = (cb,userName,passWord) => {
  apiModel.getPowerByUser(userName,passWord).then((result) => {
    return cb(result);
  })
}
module.exports = {
  addUser,
  isExist,
  findUser,
  getUsersAllDataType0,
  getUsersAllDataType1,
  delUsersOneData,
  updataUsersOneData,
  getModel,
  getLoginDateAndLoginTimes,
  updateLogin,
  findUserId,
  getPowerByUser
}
