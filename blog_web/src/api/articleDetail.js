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
//更新文章的阅读量
export function updateArticleReadCount(id) {
  var params = new URLSearchParams();
  const url = host + '/blog/updateArticleReadCount';
  params.append('id',id);
  // params.append('readCount',readCount);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}