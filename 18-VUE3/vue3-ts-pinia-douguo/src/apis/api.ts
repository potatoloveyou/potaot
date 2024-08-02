import axios from '@/apis/request';

// 全局配置
export const getConfig = () => axios.get('/config.json');

// 初始配置
export const getInit = () => axios.get('/init.json');

// 关注列表
export const getAttention = async ({ offset = 0, limit = 20 } = {}): Promise<any> =>
	await axios.get(`/home/ffeeds/${offset}/${limit}`);

// 推荐列表
export const getHomeRecommend = async ({ offset = 0, limit = 10 } = {}): Promise<any> =>
	await axios.get(`/home/recommended/${offset}/${limit}`);

// 笔记列表
export const getNotes = async ({ offset = 0, limit = 20 } = {}): Promise<any> =>
	await axios.get(`/home/notes/${offset}/${limit}`);

// 活动列表
export const getActivities = async ({ offset = 0, limit = 20 } = {}): Promise<any> =>
	await axios.get(`/home/events/getlists?${offset}/${limit}`);

// 菜谱
export const getRecipe = async (): Promise<any> => await axios.get('/recipe/flatcatalogs');
