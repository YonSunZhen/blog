import axios from 'axios';
import {host} from './config';

export function getArticleList(limit) {
  var params = new URLSearchParams();
  const url = host + '/blog/getArticlesDataByState';
  params.append('limit',limit);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}