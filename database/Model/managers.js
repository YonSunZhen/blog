function Managers(userName, passWord, state, mobile, createDate, loginDate, loginTimes, lastLoginDate){
  this.userName = userName;
  this.passWord = passWord;
  this.state = state;
  this.mobile = mobile;
  this.createDate = createDate;
  this.loginDate = loginDate;
  this.loginTimes = loginTimes;
  this.lastLoginDate = lastLoginDate;
}

module.exports = {
  Managers
}