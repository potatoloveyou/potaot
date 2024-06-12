import axios from 'axios';
axios.defaults.baseURL = 'https://apis.netstart.cn/maoyan';

// wellReceivedList 热映列表
export const wellReceivedList = () => axios.get('/index/movieOnInfoList');



