import { request } from '@/utils/request';

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
export const getWallList = async (data = {}): Promise<any> => {
	return request({
		url: '/wallList',
		data,
	});
};

// 为壁纸评分
export const getSetupScore = async (data = {}): Promise<any> => {
	return request({
		url: '/setupScore',
		data,
	});
};

// 壁纸下载
export const getWallDownload = async (data = {}): Promise<any> => {
	return request({
		url: '/downloadWall',
		data,
	});
};

// 单个壁纸详情
export const getDetailWall = async (data = {}): Promise<any> => {
	return request({
		url: '/detailWall',
		data,
	});
};

// 用户个人信息
export const getUserInfo = async (data = {}): Promise<any> => {
	return request({
		url: '/userInfo',
		data,
	});
};

// 我的评分/下载列表
export const getUserWallList = async (data = {}): Promise<any> => {
	return request({
		url: '/userWallList',
		data,
	});
};

// 壁纸资讯公告列表
export const getWallNewsDetail = async (data = {}): Promise<any> => {
	return request({
		url: '/wallNewsDetail',
		data,
	});
};
