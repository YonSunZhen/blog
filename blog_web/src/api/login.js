import axios from 'axios';
import {host} from './config';

export function login(username,password) {//state为0时根据类型id选择文章，state为1时选择所有文章
  var params = new URLSearchParams();
  const url = host + '/blog/login';
  params.append('username',username);
  params.append('password',password);
  params.append('type',1);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}