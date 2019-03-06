import axios from 'axios';
import {host} from './config';

export function getTypeList() {
  // var params = new URLSearchParams();
  const url = host + '/blog/getTypesAdopt';
  // params.append('limit',limit);
  return axios.get(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
}