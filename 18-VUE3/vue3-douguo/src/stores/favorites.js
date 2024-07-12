import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', () => {
	// // state
	// const count = ref(100)

	// // getters
	// const doubleCount = computed(() => count.value * 2)

	// // actions
	// function increment() {
	// 	count.value++
	// }

	// 菜谱
	const recipeFav = ref(JSON.parse(window.localStorage.getItem('recipeFav')) || []);
	// 笔记
	const noteFav = ref(JSON.parse(window.localStorage.getItem('noteFav')) || []);
	// 广告
	const advertisementFav = ref(JSON.parse(window.localStorage.getItem('advertisementFav')) || []);

	// 添加收藏
	const addFav = ({ type, recipe, note, advertisement }) => {
		switch (type) {
			case 1:
				recipeFav.value = [...recipeFav.value, recipe];
				break;
			case 3:
				noteFav.value = [...noteFav.value, note];
				break;
			case 300:
				advertisementFav.value = [...advertisementFav.value, advertisement];
				break;
		}
	};

	// 移除收藏
	const removeFav = ({ type, id }) => {
		switch (type) {
			case 1:
				recipeFav.value = recipeFav.value.filter((item) => item.id !== id);
				break;
			case 3:
				noteFav.value = noteFav.value.filter((item) => item.id !== id);
				break;
			case 300:
				advertisementFav.value = advertisementFav.value.filter((item) => item.id !== id);
		}
	};

	// 是否在收藏中
	const isInFav = ({ type, id }) => {
		switch (type) {
			case 1:
				return recipeFav.value.some((item) => item.id === id);
			case 3:
				return noteFav.value.some((item) => item.id === id);
			case 300:
				return advertisementFav.value.some((item) => item.id === id);
		}
	};


	// 暂存到本地
	watch(recipeFav, (newRecipeFav) => window.localStorage.setItem('recipeFav', JSON.stringify(newRecipeFav)));
	watch(noteFav, (newNoteFav) => window.localStorage.setItem('noteFav', JSON.stringify(newNoteFav)));
	watch(advertisementFav, (newAdvertisementFav) =>
		window.localStorage.setItem('advertisementFav', JSON.stringify(newAdvertisementFav)),
	);

	return { recipeFav, noteFav, advertisementFav, addFav, removeFav, isInFav };
});
