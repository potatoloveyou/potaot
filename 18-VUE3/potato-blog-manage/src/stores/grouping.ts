import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { state, grouping } from '@/mock/mock';
import type { StateType, GroupingType } from '@/type/grouping.type';

export const useGroupingStore = defineStore('grouping', () => {
	const stateData = ref<StateType[]>(state.data);
	const groupingData = ref<GroupingType>(grouping.data);

	const exclude = computed(() => {
		let arr = [];
		let n = groupingData.value.count;
		groupingData.value.list.forEach((item) => {
			arr.push(item.id);
			n -= item.value;
		});
		return { id: arr.join(','), name: '未分组', value: n };
	});

	return { stateData, groupingData, exclude };
});
