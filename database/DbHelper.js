var mysql = require('mysql');
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'blog'
});

var query = (sql, val) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err,connection) => {
      if(err){
        return resolve(err);
      }else{
        connection.query(sql,val,(err,rows) => {
          if(err){
            reject(err);
          }else{
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}

module.exports = {
  query
}