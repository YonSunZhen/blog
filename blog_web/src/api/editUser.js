import axios from 'axios';
import {host} from './config';

//获取用户model
export function getUserModel(id) {
  var params = new URLSearchParams();
  const url = host + '/index/getModel';
  params.append('id',id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

//修改个人信息(修改了用户名)
export function editUser1(id,username,mobile, remark ) {
  var params = new URLSearchParams();
  const url = host + '/index/updataUsersOneData2';
  params.append('id',id);
  params.append('mobile',mobile);
  params.append('username',username);
  params.append('remark',remark);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
//修改个人信息(没修改用户名)
export function editUser2(id,username,mobile, remark ) {
  var params = new URLSearchParams();
  const url = host + '/index/updataUsersOneData3';
  params.append('id',id);
  params.append('mobile',mobile);
  params.append('username',username);
  params.append('remark',remark);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
//修改个人信息(没修改用户名)
export function updataUserPassword(id,username,passwordAgain,passWord ) {
  var params = new URLSearchParams();
  const url = host + '/index/updataUserPassword';
  params.append('id',id);
  params.append('type',1);
  params.append('username',username);
  params.append('passwordAgain',passwordAgain);
  params.append('passWord',passWord);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}