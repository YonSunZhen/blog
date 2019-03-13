import axios from 'axios';
import {host} from './config';

//向评论增加一条回复
export function addReply(comment_id,reply_type,content,from_uid,to_uid) {
  var params = new URLSearchParams();
  const url = host + '/blog/addReply';
  params.append('comment_id',comment_id);
  params.append('reply_type',reply_type);
  params.append('content',content);
  params.append('from_uid',from_uid);
  params.append('to_uid',to_uid);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}

//根据评论id获取这条评论的所有回复
export function getReplysByCommentID(comment_id) {
  var params = new URLSearchParams();
  const url = host + '/index/getReplysByCommentID';
  params.append('comment_id',comment_id);
  return axios.post(url,params)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}