function Users(userName,mobile,state,power,remark,passWord,createDate,id,type,loginDate,loginTimes,lastLoginDate){
  this.userName = userName;
  this.passWord = passWord;
  this.state = state;
  this.mobile = mobile;
  this.createDate = createDate;
  this.loginDate = loginDate;
  this.id = id;
  this.type = type;
  this.power = power;
  this.remark = remark;
  this.loginTimes = loginTimes;
  this.lastLoginDate = lastLoginDate;
}

module.exports = {
  Users
}