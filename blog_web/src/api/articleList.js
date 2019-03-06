import axios from 'axios';
import {host} from './config';

export function getArticleList(limit,state,id) {//state为0时根据类型id选择文章，state为1时选择所有文章
  var params = new URLSearchParams();
  const url = host + '/blog/getArticlesDataByState';
  params.append('limit',limit);
  params.append('state',state);
  params.append('typeId',id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}