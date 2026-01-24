import { ref } from 'vue';
import { defineStore } from 'pinia';
import { photoGalleryGrouping } from '@/mock/mock';
import type { GroupingType } from '@/type/grouping.type';

export const usePhotoGalleryStore = defineStore('photoGallery', () => {
	// 分组数据
	const groupingData = ref<GroupingType>({
		count: 0,
		list: [],
	});

	const getGroupingList = async () => {
		groupingData.value = await photoGalleryGrouping.data;
	};
	return {
		groupingData,
		getGroupingList,
	};
});
