import { ref, watch, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { getRecipeDetail, getNoteDetail } from '@/apis/api';

export const useFavoritesStore = defineStore('favorites', () => {
	// // getters
	// const doubleCount = computed(() => count.value * 2)

	// 菜谱资料
	const recipeDetail = async (recipeId: string | number): Promise<any> => {
		return await getRecipeDetail(recipeId.toString());
	};

	// 笔记资料
	const noteDetail = async (noteId: string | number): Promise<any> => {
		return await getNoteDetail(noteId.toString());
	};

	// 菜谱
	const recipeFav = ref(JSON.parse(window.localStorage.getItem('recipeFav') as string) || []);
	// 笔记
	const noteFav = ref(JSON.parse(window.localStorage.getItem('noteFav') as string) || []);
	// 广告
	const advertisementFav = ref(JSON.parse(window.localStorage.getItem('advertisementFav') as string) || []);
	// 采购清单
	const purchaseListFav = ref(JSON.parse(window.localStorage.getItem('purchaseListFav') as string) || []);

	// 按钮禁用状态
	const isButtonDisabled = ref(false);

	// 添加收藏
	const addFav = async ({ type, id }: { type: number; id: string }) => {
		if (isButtonDisabled.value) {
			return;
		}
		isButtonDisabled.value = true;
		try {
			let res;
			switch (type) {
				case 1:
					res = await recipeDetail(id);
					recipeFav.value = [...new Set([res.data.result.recipe, ...recipeFav.value])];
					break;
				case 3:
					res = await noteDetail(id);
					noteFav.value = [...new Set([res.data.result.note, ...noteFav.value])];
					break;
				case 300:
					res = await recipeDetail(id);
					advertisementFav.value = [...new Set([res.data.result.advertisement, ...advertisementFav.value])];
					break;
				default:
					break;
			}
		} finally {
			isButtonDisabled.value = false;
		}
	};

	// 移除收藏
	const removeFav = ({ type, id }: { type: number; id: string | number }) => {
		switch (type) {
			case 1:
				recipeFav.value = recipeFav.value.filter((item: any) => item.cook_id != id);
				break;
			case 3:
				noteFav.value = noteFav.value.filter((item: any) => item.id != id);
				break;
			case 300:
				advertisementFav.value = advertisementFav.value.filter((item: any) => item.cook_id != id);
				break;
		}
	};

	// 是否在收藏中
	const isInFav = ({ type, id }: { type: number; id: string | number }) => {
		switch (type) {
			case 1:
				return recipeFav.value.some((item: any) => item.cook_id == id);
			case 3:
				return noteFav.value.some((item: any) => item.id == id);
			case 300:
				return advertisementFav.value.some((item: any) => item.cook_id == id);
		}
	};

	// 暂存到本地
	watch(recipeFav, (newRecipeFav) => window.localStorage.setItem('recipeFav', JSON.stringify(newRecipeFav)));
	watch(noteFav, (newNoteFav) => window.localStorage.setItem('noteFav', JSON.stringify(newNoteFav)));
	watch(advertisementFav, (newAdvertisementFav) =>
		window.localStorage.setItem('advertisementFav', JSON.stringify(newAdvertisementFav)),
	);
	watch(purchaseListFav, (newPurchaseListFav) =>
		window.localStorage.setItem('purchaseListFav', JSON.stringify(newPurchaseListFav)),
	);

	return {
		recipeDetail,
		noteDetail,
		recipeFav,
		noteFav,
		advertisementFav,
		purchaseListFav,
		addFav,
		removeFav,
		isInFav,
	};
});
