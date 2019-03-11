import axios from 'axios';
import {host} from './config';

export function getArticleDetail(id) {
  var params = new URLSearchParams();
  const url = host + '/blog/getArticleOneData';
  params.append('id',id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}