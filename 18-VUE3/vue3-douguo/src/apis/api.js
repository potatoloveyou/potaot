import axios from './axios';

// 全局配置
export const getConfig = () => axios.get('/config.json');

// 初始配置
export const getInit = () => axios.get('/init.json');
