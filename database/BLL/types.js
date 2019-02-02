var apiModel = require("../DAL/types");

//查询所有类型
let getTypesAllData = (cb) => {
  apiModel.getTypesAllData().then((result) => {
    return cb(result);
  })
}
//增加一个类型
let addType = (cb,typeName,createPeople,createDate,remark,state) => {
  apiModel.addType(typeName,createPeople,createDate,remark,state).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//删除一个类型
let deleteType = (cb,id) => {
  apiModel.deleteType(id).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//根据id查询出一个类型
let getTypesOneData = (cb,id) => {
  apiModel.getTypesOneData(id).then((result) => {
    return cb(result);
  })
}
//更新一个类型
let updateType = (cb,id,typeName,updateDate,updatePeople,state,remark) => {
  apiModel.updateType(id,typeName,updateDate,updatePeople,state,remark).then((result) => {
    if(result.affectedRows > 0){
      return cb("true");
    }else{
      return cb("false");
    }
  })
}
//查询出所有通过的类型（增加文章页面初始化类型使用）
let getTypesAdopt = (cb) => {
  apiModel.getTypesAdopt().then((result) => {
    return cb(result);
  })
}

module.exports = {
  getTypesAllData,
  addType,
  deleteType,
  getTypesOneData,
  updateType,
  getTypesAdopt
}