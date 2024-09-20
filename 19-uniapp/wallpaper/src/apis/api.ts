import { request } from '@/apis/request';

// 首页海报列表
export const getBanner = (): Promise<any> => {
	return request({
		url: '/homeBanner',
	});
};

// 壁纸资讯公告列表
export const getwallNews = (data = {}): Promise<any> => {
	return request({
		url: '/wallNewsList',
		data,
	});
};

// 随机9张壁纸
export const getWallpaper = async (): Promise<any> => {
	return request({
		url: '/randomWall',
	});
};

// 壁纸大分类
export const getClassify = async (data = {}): Promise<any> => {
	return request({
		url: '/classify',
		data,
	});
};

// 分类中壁纸列表（分类详情）
export const getWallList= async (data = {}): Promise<any> => {
	return request({
		url: '/wallList',
		data,
	});
}
