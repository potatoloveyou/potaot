import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { state, grouping } from '@/mock/mock';
import type { State, Grouping } from '@/type/grouping.type';

export const useGroupingStore = defineStore('grouping', () => {
	const stateData = ref<State[]>(state.data);
	const groupingData = ref<Grouping>(grouping.data);

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
