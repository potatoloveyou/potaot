import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { getSearchSuggest } from '@/apis/api';

export const useSearchStore = defineStore('search', () => {
	const searchValue = ref<string>('');
	const searchList = ref<any[]>([]);

	// 历史搜索
	const historyList = ref(JSON.parse(window.localStorage.getItem('historyList') || '[]'));

	// 添加历史搜索
	const addNewHistory = (searchValue: string) => {
		searchValue ? (historyList.value = [...new Set([searchValue, ...historyList.value])]) : [];
	};

	// 删除历史搜索
	const deleteHistory = () => {
		historyList.value = [];
		// console.log(123);
	};

	// 将历史搜索存入本地
	watch(historyList, (newHistory) => {
		window.localStorage.setItem('historyList', JSON.stringify(newHistory));
	});

	// 搜索建议
	const suggestList = ref<any[]>([]);
	const searchSuggest = async (keyword: string) => {
		await getSearchSuggest(keyword).then((res) => {
			suggestList.value = res.data.result.suggests;
			console.log(suggestList.value);
		});
	};

	return { searchValue, searchList, historyList, addNewHistory, deleteHistory, suggestList, searchSuggest };
});
