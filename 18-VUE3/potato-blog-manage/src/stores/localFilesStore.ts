import { ref } from 'vue';
import { defineStore } from 'pinia';
import { localFilesArticleGrouping } from '@/mock/mock';
import type { GroupingType } from '@/type/grouping.type';

// 本地文件存储
export const uselocalFilesStore = defineStore('localFiles', () => {
	// 文章分组数据
	const groupingData = ref<GroupingType>({
		count: 0,
		list: [],
	});

	const getGroupingList = async () => {
		groupingData.value = await localFilesArticleGrouping.data;
	};

	return { groupingData, getGroupingList };
});
