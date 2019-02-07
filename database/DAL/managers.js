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
let addManager = (model) => {
  let _sql = `insert into Managers set 
              id = "${model.id}",
              userName="${model.userName}",
              passWord="${model.passWord}",
              state="${model.state}",
              mobile="${model.mobile}",
              createDate="${model.createDate}",
              power="${model.power}",
              remark="${model.remark}"
              `;
  console.log(1);
  return apiModel.query(_sql);
}

//验证用户（登录）
let findManager = (userName, password) => {
  let _sql = `select * from Managers where userName="${userName}" AND passWord="${password}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

//验证用户是否已存在（登录）
let isExist = (userName) => {
  let _sql = `select * from Managers where userName="${userName}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

//获取Managers所有数据
let getManagersAllData = () => {
  let _sql = `select * from Managers where userName != "superAdmin";`
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delManagersOneData = (id) => {
  let _sql = `delete from Managers where id="${id}";`
  return apiModel.query(_sql);
}
//更改Managers中的一条数据
let updataManagersOneData = (model,id) => {
  let _sql = `update Managers set 
              userName="${model.userName}",
              state="${model.state}",
              mobile="${model.mobile}",
              power="${model.power}",
              remark="${model.remark}"
              where id="${id}";
              `
  return apiModel.query(_sql);
}
//根据id获取一条数据(模型)
let getModel = (id) => {
  let _sql = `select * from Managers where id="${id}";`
  return apiModel.query(_sql);
}
//根据用户名和密码查找出登陆时间和登陆次数
let getLoginDateAndLoginTimes = (userName,passWord) => {
  let _sql = `select loginDate,loginTimes from Managers where userName="${userName}" AND passWord="${passWord}"; `
  return apiModel.query(_sql);
}
//更新用户的登陆时间，登陆次数等
let updateLogin = (loginDate,lastLoginDate,loginTimes,userName,passWord) => {
  let _sql = `update Managers set
              loginDate="${loginDate}",
              lastLoginDate="${lastLoginDate}",
              loginTimes="${loginTimes}"
              where userName="${userName}" AND passWord="${passWord}";
              `
  return apiModel.query(_sql);
}
module.exports = {
  isExist,
  addManager,
  findManager,
  getManagersAllData,
  delManagersOneData,
  updataManagersOneData,
  getModel,
  getLoginDateAndLoginTimes,
  updateLogin
}