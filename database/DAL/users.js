var apiModel = require('../DbHelper');
// let users = 
//   `create table if not exists users(
//     id INT NOT NULL AUTO_INCREMENT,
//     username VARCHAR(100) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     state SMALLINT NOT NULL,
//     mobile VARCHAR(12),
//     remark VARCHAR(500),
//     createDate DATETIME,
//     loginDate DATETIME,
//     loginTimes DATETIME,
//     lastLoginDate DATETIME,
//     PRIMARY KEY(id)
//   );`

// let createTable = (sql) => {
//   return apiModel.query(sql,[]);
// }
//建表，这个文件被加载，就进行建表
// createTable(users);

//增加用户（注册）
let addUser = (model) => {
  let _sql = `insert into users set 
              id = "${model.id}",
              userName="${model.userName}",
              passWord="${model.passWord}",
              state="${model.state}",
              mobile="${model.mobile}",
              createDate="${model.createDate}",
              power="${model.power}",
              type="${model.type}",
              remark="${model.remark}";`
  console.log(1);
  return apiModel.query(_sql);
}

//验证用户（登录）
let findUser = (userName, password, type) => {
  let _sql = `select id from users where userName="${userName}" AND passWord="${password}" AND type="${type}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

//验证用户是否已存在（注册）
let isExist = (userName,type) => {
  let _sql = `select * from users where userName="${userName}" AND type="${type}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

//获取Users所有数据（除了超管,管理员管理模块）
let getUsersAllDataType0 = () => {
  let _sql = `select * from users where userName != "superAdmin" AND type=0 ORDER BY createDate DESC;`
  return apiModel.query(_sql);
}
//获取Users所有数据（除了超管,普通用户管理模块）
let getUsersAllDataType1 = () => {
  let _sql = `select * from users where type=1 ORDER BY createDate DESC;`
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delUsersOneData = (id) => {
  let _sql = `delete from users where id="${id}";`
  return apiModel.query(_sql);
}
//更改Users中的一条数据
let updataUsersOneData = (model,id) => {
  let _sql = `update users set 
              userName="${model.userName}",
              state="${model.state}",
              mobile="${model.mobile}",
              power="${model.power}",
              remark="${model.remark}"
              where id="${id}";
              `
  return apiModel.query(_sql);
}
//更改Users中的一条数据(更改个人信息用的)
let updataUsersOwnData = (id,userName,passWord,mobile,remark) => {
  let _sql = `update users set 
              userName="${userName}",
              passWord="${passWord}",
              mobile="${mobile}",
              remark="${remark}"
              where id="${id}";
              `
  return apiModel.query(_sql);
}
//根据id获取一条数据(模型)
let getModel = (id) => {
  let _sql = `select * from users where id="${id}";`
  return apiModel.query(_sql);
}
//根据用户名和密码查找出登陆时间和登陆次数
let getLoginDateAndLoginTimes = (userName,passWord) => {
  let _sql = `select loginDate,loginTimes from users where userName="${userName}" AND passWord="${passWord}"; `
  return apiModel.query(_sql);
}
//更新用户的登陆时间，登陆次数等
let updateLogin = (loginDate,lastLoginDate,loginTimes,userName,passWord) => {
  let _sql = `update users set
              loginDate="${loginDate}",
              lastLoginDate="${lastLoginDate}",
              loginTimes="${loginTimes}"
              where userName="${userName}" AND passWord="${passWord}";
              `
  return apiModel.query(_sql);
}
//根据普通管理员用户名和密码获取普管的权限
let getPowerByUser = (userName,passWord) => {
  let _sql = `select power from users where userName="${userName}" AND passWord="${passWord}"; `
  return apiModel.query(_sql);
}
module.exports = {
  isExist,
  addUser,
  findUser,
  getUsersAllDataType0,
  getUsersAllDataType1,
  delUsersOneData,
  updataUsersOneData,
  getModel,
  getLoginDateAndLoginTimes,
  updateLogin,
  getPowerByUser,
  updataUsersOwnData
}