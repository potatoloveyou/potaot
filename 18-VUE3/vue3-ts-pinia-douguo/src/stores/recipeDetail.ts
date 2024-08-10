import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
export const useRecipeDetailStore = defineStore('recipeDetail', () => {
	// 菜谱Id
	const recipeId = ref('');

	return { recipeId };
});
