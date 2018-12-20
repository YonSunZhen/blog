// import { query } from '../DbHelper';
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
              userName="${model.userName}",
              passWord="${model.passWord}",
              state="${model.state}",
              mobile="${model.mobile}",
              createDate="${model.createDate}"
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
  let _sql = `select * from Managers;`
  return apiModel.query(_sql);
}
//根据id删除一条数据
let delManagersOneData = (id) => {
  let _sql = `delete from Managers where id="${id}";`
  return apiModel.query(_sql);
}

module.exports = {
  isExist,
  addManager,
  findManager,
  getManagersAllData,
  delManagersOneData
}