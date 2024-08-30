import _axios from '@/apis/request';
// 重命名 _axios 为 axios
const axios = _axios;

// 全局配置
export const getConfig = () => axios.get('/config.json');

// 初始配置
export const getInit = () => axios.get('/init.json');

// 关注列表
export const getAttention = async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }): Promise<any> =>
	await axios.get(`/home/ffeeds/${offset}/${limit}`);

// 推荐列表
export const getHomeRecommend = async ({ offset = 0, limit = 10 }: { offset?: number; limit?: number }): Promise<any> =>
	await axios.get(`/home/recommended/${offset}/${limit}`);

// 笔记列表
export const getNotes = async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }): Promise<any> =>
	await axios.get(`/home/notes/${offset}/${limit}`);

// 活动列表
export const getActivities = async ({ offset = 0, limit = 20 } = {}): Promise<any> =>
	await axios.get(`/home/events/getlists?offset=${offset}limit=${limit}`);
//

// 菜谱
export const getRecipe = async (): Promise<any> => await axios.get('/recipe/flatcatalogs');

// 热门搜索
export const getHotSearch = async (): Promise<any> => await axios.get('/recipe/search/hot');

// 搜索建议
export const getSearchSuggest = async (keyword?: string): Promise<any> =>
	await axios.get(`/recipe/search/suggests?kw=${keyword}`);

// 搜索结果
/**
 * @param keyword 关键词
 * @param order 排序方式 0-综合排序 1-收藏最多 2-学做最多
 * @param type 搜索类型 0-文章 1-视频
 * @param offset 分页偏移	limit的倍数
 * @param limit 分页大小
 */
interface SearchParams {
	keyword: string;
	order?: number;
	type?: number;
	offset?: number;
	limit?: number;
}
export const getSearch = async (params: SearchParams): Promise<any> => {
	const { keyword, order = 0, type = 0, offset = 0, limit = 20 } = params;
	return await axios.get(
		`/recipe/search?keyword=${keyword}&order=${order}&type=${type}&offset=${offset}&limit=${limit}`,
	);
};

// 菜谱详情
export const getRecipeDetail = async (recipeId?: string): Promise<any> => await axios.get(`/recipe/detail/${recipeId}`);

// 菜谱相关信息（菜谱详情里的评论）
export const getRecipeRelatedinfo = async (recipeId?: string): Promise<any> =>
	await axios.get(`/recipe/relatedinfo/${recipeId}`);

// 菜谱评论
export const getFlatcomments = async ({
	recipeid,
	offset = 0,
	limit = 20,
}: {
	recipeid?: string;
	offset?: number;
	limit?: number;
}): Promise<any> => await axios.get(`/recipe/flatcomments/${recipeid}/${offset}/${limit}`);

// 笔记详情
export const getNoteDetail = async (noteId?: string): Promise<any> => await axios.get(`/note/detail/${noteId}`);

// --------------------------------------------------------------------------------------------------------------------------------

// import axios from '@/apis/request';
// // 全局配置
// export const getConfig = async (): Promise<any> => {
// 	try {
// 		const response = await axios.get('/config.json');
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching config:', error);
// 		throw error;
// 	}
// };

// // 初始配置
// export const getInit = async (): Promise<any> => {
// 	try {
// 		const response = await axios.get('/init.json');
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching init:', error);
// 		throw error;
// 	}
// };

// // 关注列表
// export const getAttention = async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/home/ffeeds/${offset}/${limit}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching attention list:', error);
// 		throw error;
// 	}
// };

// // 推荐列表
// export const getHomeRecommend = async ({
// 	offset = 0,
// 	limit = 10,
// }: {
// 	offset?: number;
// 	limit?: number;
// }): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/home/recommended/${offset}/${limit}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching home recommend list:', error);
// 		throw error;
// 	}
// };

// // 笔记列表
// export const getNotes = async ({ offset = 0, limit = 20 }: { offset?: number; limit?: number }): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/home/notes/${offset}/${limit}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching notes list:', error);
// 		throw error;
// 	}
// };

// // 活动列表
// export const getActivities = async ({ offset = 0, limit = 20 } = {}): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/home/events/getlists?offset=${offset}&limit=${limit}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching activities list:', error);
// 		throw error;
// 	}
// };

// // 菜谱
// export const getRecipe = async (): Promise<any> => {
// 	try {
// 		const response = await axios.get('/recipe/flatcatalogs');
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching recipe:', error);
// 		throw error;
// 	}
// };

// // 热门搜索
// export const getHotSearch = async (): Promise<any> => {
// 	try {
// 		const response = await axios.get('/recipe/search/hot');
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching hot search:', error);
// 		throw error;
// 	}
// };

// // 搜索建议
// export const getSearchSuggest = async (keyword?: string): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/recipe/search/suggests?kw=${keyword}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching search suggestions:', error);
// 		throw error;
// 	}
// };

// // 搜索结果
// export const getSearch = async (params: SearchParams): Promise<any> => {
// 	const { keyword, order = 0, type = 0, offset = 0, limit = 20 } = params;
// 	try {
// 		const response = await axios.get(
// 			`/recipe/search?keyword=${keyword}&order=${order}&type=${type}&offset=${offset}&limit=${limit}`,
// 		);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching search results:', error);
// 		throw error;
// 	}
// };

// // 菜谱详情
// export const getRecipeDetail = async (recipeId?: string): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/recipe/detail/${recipeId}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching recipe detail:', error);
// 		throw error;
// 	}
// };

// // 菜谱相关信息（菜谱详情里的评论）
// export const getRecipeRelatedinfo = async (recipeId?: string): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/recipe/relatedinfo/${recipeId}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching recipe related info:', error);
// 		throw error;
// 	}
// };

// // 菜谱评论
// export const getFlatcomments = async ({
// 	recipeid,
// 	offset = 0,
// 	limit = 20,
// }: {
// 	recipeid?: string;
// 	offset?: number;
// 	limit?: number;
// }): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/recipe/flatcomments/${recipeid}/${offset}/${limit}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching flat comments:', error);
// 		throw error;
// 	}
// };

// // 笔记详情
// export const getNoteDetail = async (noteId?: string): Promise<any> => {
// 	try {
// 		const response = await axios.get(`/note/detail/${noteId}`);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching note detail:', error);
// 		throw error;
// 	}
// };
