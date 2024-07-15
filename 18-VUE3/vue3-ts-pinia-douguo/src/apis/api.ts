import axios from '@/apis/request';

// 全局配置
export const getConfig = () => axios.get('/config.json');

// 初始配置
export const getInit = () => axios.get('/init.json');

// 推荐列表
export const getHomeRecommend = async ({ offset = 0 , limit = 10 } = {}): Promise<any> =>
	axios.get(`/home/recommended/${offset}/${limit}`);
