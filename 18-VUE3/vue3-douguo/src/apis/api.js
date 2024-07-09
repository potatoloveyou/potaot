import axios from './axios';

// 全局配置
export const getConfig = () => axios.get('/config.json');

// 初始配置
export const getInit = () => axios.get('/init.json');

// 推荐列表
export const getHomeRecommend = ({ offset = 0, limit = 10 } = {}) => axios.get(`/home/recommended/${offset}/${limit}`);
