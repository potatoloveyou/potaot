import axios from '@/apis/request';

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
// export const getActivities = async ({ offset = 0, limit = 20 } = {}): Promise<ActivitiesResponse> => {
// 	try {
// 		const response = await apiClient.get(`/getlists?offset=${offset}&limit=${limit}`);
// 		return response.data;
// } catch (error) {
// 		console.error("Error fetching activities:", error);
// 		throw error;
// }
// };

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
