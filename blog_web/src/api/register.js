import axios from 'axios';
import {host} from './config';

export function register(username,password,mobile,remark,state,type) {//state为0时根据类型id选择文章，state为1时选择所有文章
  var params = new URLSearchParams();
  const url = host + '/register';
  params.append('username',username);
  params.append('password',password);
  params.append('mobile',mobile);
  params.append('remark',remark);
  params.append('state',state);
  params.append('type',type);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}