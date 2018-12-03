// import { query } from '../DbHelper';
var apiModel = require('../DbHelper');
let users = 
  `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
  );`

let createTable = (sql) => {
  return apiModel.query(sql,[]);
}
//建表，这个文件被加载，就进行建表
createTable(users);

//增加用户（注册）
let addUser = (userName, password) => {
  let _sql = `insert into users set username="${userName}",password="${password}"`;
  console.log(1);
  return apiModel.query(_sql);
}

//验证用户（登录）
let findUser = (userName, password) => {
  let _sql = `select * from users where username="${userName}" AND password="${password}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

//验证用户是否已存在（登录）
let isExist = (userName) => {
  let _sql = `select * from users where username="${userName}"; `
  // console.log(1);
  return apiModel.query(_sql);
}

module.exports = {
  isExist,
  addUser,
  findUser
}