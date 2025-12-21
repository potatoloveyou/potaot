import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { state, grouping } from '@/mock/mock';
import type { StateType, GroupingType } from '@/type/grouping.type';

export const useGroupingStore = defineStore('grouping', () => {
	// 文章状态：已发布/未发布
	const stateData = ref<StateType[]>(state.data);
	// 分组数据
	const groupingData = ref<GroupingType>(grouping.data);

	// 未分组
	const exclude = computed(() => {
		let arr = [];
		let n = groupingData.value.count;
		groupingData.value.list.forEach((item) => {
			arr.push(item.id);
			n -= item.value;
		});
		return { id: arr.join(','), name: '未分组', value: n };
	});

	// 选中的分组id
	const selectTagId = ref<number | string>(0);

	return { stateData, groupingData, exclude, selectTagId };
});
