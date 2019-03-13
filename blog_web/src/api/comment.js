import axios from 'axios';
import {host} from './config';

//根据文章id获取关于这篇文章的所有评论
export function getArticleComments(id) {//state为0时根据类型id选择文章，state为1时选择所有文章
  var params = new URLSearchParams();
  const url = host + '/blog/getCommentsByArticleId';
  params.append('id',id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
//增加一条评论
export function addOneComment(articleID, typeID, content, from_uid) {
  var params = new URLSearchParams();
  const url = host + '/blog/addOneComment';
  params.append('articleID',articleID);
  params.append('typeID',typeID);
  params.append('content',content);
  params.append('from_uid',from_uid);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}
//删除一条评论
export function delComment(id) {
  var params = new URLSearchParams();
  const url = host + '/index/delComment';
  params.append('id',id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}