import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useRouter } from 'vue-router';

export const useRecipeDetailStore = defineStore('recipeDetail', () => {
	// 菜谱Id
	const recipeId = ref('');

	const router = useRouter();

	// 跳转到菜谱详情页
	const toRecipeDetail = (id: string) => {
		recipeId.value = id;
		router.push({ path: '/recipeDetail', query: { recipeId: id } });
	};

	return { recipeId, toRecipeDetail };
});
