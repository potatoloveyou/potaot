import { ref } from 'vue';
import { defineStore } from 'pinia';
import { blogPostsArticleState, blogPostsArticleGrouping } from '@/mock/mock';
import type { StateType, GroupingType } from '@/type/grouping.type';

// 博客文章存储
export const useBlogPostsStore = defineStore('blogPosts', () => {
	// 文章状态：已发布/未发布
	const stateData = ref<StateType[]>([]);
	// 分组数据
	const groupingData = ref<GroupingType>({
		count: 0,
		list: [],
	});

	const getGroupingList = async () => {
		stateData.value = await blogPostsArticleState.data;
		groupingData.value = await blogPostsArticleGrouping.data;
	};

	return {
		stateData,
		groupingData,
		getGroupingList,
	};
});
