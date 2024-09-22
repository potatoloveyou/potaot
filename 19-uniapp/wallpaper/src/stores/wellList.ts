import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useWellListStore = defineStore('wellList', () => {
	const wallNewList = ref<object[]>([]);
	return { wallNewList };
});
