// var mysql = require('mysql');
// var pool = mysql.createPool({
//   host:'localhost',
//   user:'root',
//   password:'root',
//   database:'blog'
// });

// var query = (sql, val) => {
//   return new Promise((resolve,reject) => {
//     pool.getConnection((err,connection) => {
//       if(err){
//         return resolve(err);
//       }else{
//         connection.query(sql,val,(err,rows) => {
//           if(err){
//             reject(err);
//           }else{
//             resolve(rows);
//           }
//           connection.release();
//         })
//       }
//     })
//   })
// }

// var query = (sql, val) => {
//   pool.getConnection(function(err,connection){
//     if(err){
//       throw err;
//     }
//     connection.query(sql,function(error,results){
//       connection.release();
//       if(err){
//         throw error;
//       }
//     })
//   })
// }

// let users = 
//   `create table if not exists users(
//     id INT NOT NULL AUTO_INCREMENT,
//     username VARCHAR(100) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY(id)
//   );`

// let createTable = (sql) => {
//   return query(sql,[]);
// }

// //建表，这个文件被加载，就进行建表
// createTable(users);

//添加管理员,这样只是创建一个函数而已，并没有执行
// let addUser = ( value ) => {
//   let _sql = `insert into users set username=?,password=?`;
//   console.log(1);
//   return query(_sql,value);
// }

// module.exports = {
//   addUser
// }