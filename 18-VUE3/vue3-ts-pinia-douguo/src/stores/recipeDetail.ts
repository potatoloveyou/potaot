import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';

import { useRoute, useRouter } from 'vue-router';

export const useRecipeDetailStore = defineStore('recipeDetail', () => {
	// 菜谱Id
	const recipeId = ref('');

	const route = useRoute();
	const router = useRouter();

	// 跳转到菜谱详情页
	const redirectRecipeDetail = (item: any) => {
		switch (item.type) {
			case 1:
				recipeId.value = item.r.id;
				router.push({ path: '/recipeDetail', query: { recipeId: item.r.id } });
				break;
			case 3:
				recipeId.value = item.note.id;
				router.push({ path: '/recipeDetail', query: { recipeId: item.note.id } });
				break;
			case 300:
				recipeId.value = item.dsp.id;
				router.push({ path: '/recipeDetail', query: { recipeId: item.dsp.id } });
				break;
			default:
				break;
		}
	};

	return { recipeId, redirectRecipeDetail };
});
