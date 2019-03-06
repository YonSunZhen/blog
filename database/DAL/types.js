var apiModel = require("../DbHelper");

//查询所有类型
let getTypesAllData = () => {
  let _sql = `select * from types;`
  return apiModel.query(_sql);
}
//增加一个类型
let addType = (typeName,createPeople,createDate,remark,state) => {
  let _sql = `insert into types set 
              typeName="${typeName}",
              createPeople="${createPeople}",
              createDate="${createDate}",
              remark="${remark}",
              state="${state}"`;
  return apiModel.query(_sql);
}
//删除一个类型
let deleteType = (id) => {
  let _sql = `delete from types where id="${id}";`
  return apiModel.query(_sql);
}
//根据id查询出一个类型
let getTypesOneData = (id) => {
  let _sql = `select * from types where id="${id}";`
  return apiModel.query(_sql);
}
//更新一个类型
let updateType = (id,typeName,updateDate,updatePeople,state,remark) => {
  let _sql = `update types set 
              typeName="${typeName}",
              updatePeople="${updatePeople}",
              updateDate="${updateDate}",
              state="${state}",
              remark="${remark}"
              where id="${id}";
              `
  return apiModel.query(_sql);
}
//查询出所有通过的类型（增加文章页面初始化类型使用）
let getTypesAdopt = () => {
  let _sql =  `select * from types where state=1 ORDER BY createDate;`
  return apiModel.query(_sql);
}


module.exports = {
  getTypesAllData,
  addType,
  deleteType,
  getTypesOneData,
  updateType,
  getTypesAdopt
}