function Managers(userName,mobile,state,passWord,createDate,id,loginDate,loginTimes,lastLoginDate){
  this.userName = userName;
  this.passWord = passWord;
  this.state = state;
  this.mobile = mobile;
  this.createDate = createDate;
  this.loginDate = loginDate;
  this.id = id;
  this.loginTimes = loginTimes;
  this.lastLoginDate = lastLoginDate;
}

module.exports = {
  Managers
}