import { request } from '@/utils/request.ts';

// 首页推荐数据
export const getIndexList = (): Promise<any> => {
	return request({
		url: '/index_list/data',
	});
};

interface Data {
	index: number | string;
	offset: number | string;
}
// 首页分类
export const getIndexClassify = (data: Data) => {
	let { index = 1, offset = 1 } = data;
	return request({
		url: `/index_list/data/${index}`,
		data: {
			offset,
		},
	});
};
