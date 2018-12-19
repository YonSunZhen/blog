function User(username, password, state, mobile, createDate, loginDate, loginTimes, lastLoginDate){
  this.username = username;
  this.password = password;
  this.state = state;
  this.mobile = mobile;
  this.createDate = createDate;
  this.loginDate = loginDate;
  this.loginTimes = loginTimes;
  this.lastLoginDate = lastLoginDate;
}

module.exports = {
  User
}