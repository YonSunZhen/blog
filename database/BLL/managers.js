var apiModel = require('../DAL/managers');

//登录验证
var findManager = (cb, userName, password) => {
  //利用回调函数
  apiModel.findManager(userName,password).then((result) => {
    if(result.length > 0 && result[0].state === 1){
      console.log(result[0]);
      return cb("true");
    }else{
      // console.log(result);
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
var addManager = (cb, model) => {
  apiModel.addManager(model).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}

//获取Managers所有数据
var getManagersAllData = (cb) => {
  apiModel.getManagersAllData().then((result) => {
    return cb(result);
  })
}
//根据id删除一条数据
var delManagersOneData = (cb,id) => {
  apiModel.delManagersOneData(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//更改Managers中的一条数据
var updataManagersOneData = (cb,model,id) => {
  apiModel.updataManagersOneData(model,id).then((result) => {
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
var findManagerId = (cb, userName, password) => {
  //利用回调函数
  apiModel.findManager(userName,password).then((result) => {
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
  addManager,
  isExist,
  findManager,
  getManagersAllData,
  delManagersOneData,
  updataManagersOneData,
  getModel,
  getLoginDateAndLoginTimes,
  updateLogin,
  findManagerId,
  getPowerByUser
}
