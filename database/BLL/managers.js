var apiModel = require('../DAL/managers');

//登录验证
var findManager = (cb, userName, password) => {
  //利用回调函数
  apiModel.findManager(userName,password).then((result) => {
    if(result.length > 0 && result[0].state === 1){
      console.log(result[0]);
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

module.exports = {
  addManager,
  isExist,
  findManager,
  getManagersAllData,
  delManagersOneData
}
