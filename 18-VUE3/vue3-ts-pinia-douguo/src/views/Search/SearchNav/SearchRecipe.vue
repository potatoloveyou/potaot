<template>
	<!-- 搜索菜谱 -->
	<div class="search-recipe-top">
		<div class="top-left">
			<ul>
				<li @click="handleSearch({ order: 0, type: 0 })">综合</li>
				<li @click="handleSearch({ order: 1, type: 0 })">收藏高</li>
				<li @click="handleSearch({ order: 2, type: 0 })">学做多</li>
			</ul>
		</div>
		<div class="top-right" @click="handleSearch({ order: 0, type: 1 })">
			视频
			<van-icon name="play-circle-o" />
		</div>
	</div>

	<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<div class="item-card" v-for="search in searchs">
			<SearchRecipeCard v-if="search.type == '13'" :search="search" />
		</div>
	</van-list>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import SearchRecipeCard from '@/components/Search/SearchNav/SearchRecipe/SearchRecipeCard.vue';
import { getSearch } from '@/apis/api';

import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

// vant列表组件加载更多
const loading = ref(false);
const finished = ref(false);

// 搜索列表
const searchs = ref([]);
// 更新偏移量
let offset = ref(0);
// 存储当前的搜索参数
const currentParams = ref({});

// 处理搜索
const handleSearch = (params: object) => {
	offset.value = 0; // 重置偏移量
	searchs.value = []; // 清空当前搜索结果
	currentParams.value = params; // 更新当前的搜索参数
	searchList(params); // 调用 searchList 函数并传递参数
};

const searchList = async (params = {}) => {
	try {
		const res = await getSearch({ keyword: searchStore.searchValue, offset: offset.value * 20, ...params });
		searchs.value = [...searchs.value, ...res.data.result.list];
		console.log(searchs.value);

		nextTick(() => {
			offset.value++;
		});
	} catch (error) {
		nextTick(() => {
			finished.value = true;
		});
	} finally {
		nextTick(() => {
			loading.value = false;
		});
	}

	// await getSearch({ keyword: searchStore.searchValue, offset: offset.value * 20 })
	// 	.then((res) => {
	// 		searchs.value = [...searchs.value, ...res.data.result.list];
	// 		if (res.data.result.end == 1) {
	// 			isData.value = true;
	// 		}
	// 		console.log(searchs.value);
	// 		nextTick(() => {
	// 			offset.value++;
	// 		});
	// 	})
	// 	.catch(() => {
	// 		nextTick(() => {
	// 			finished.value = true;
	// 		});
	// 	})
	// 	.finally(() => {
	// 		nextTick(() => {
	// 			loading.value = false;
	// 		});
	// 	});
};

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	console.log(searchStore.isData);
	// if (searchStore.isData) {
	// 	console.log(123);
	// 	searchList(currentParams.value);
	// } else {
	// 	loading.value = false;
	// 	finished.value = true;
	// 	console.log(456);
	// }
	searchStore.isData
		? (console.log(123), searchList(currentParams.value))
		: (console.log(456), (loading.value = false), (finished.value = true));
};
</script>

<style lang="scss" scoped>
.search-recipe-top {
	display: flex;
	justify-content: space-between;
	color: #646566;
	padding: 0.6rem 0.8rem;
	.top-left {
		ul {
			display: flex;
			li {
				// padding: 0.8rem 1rem 0.8rem 0;
				padding-right: 1rem;
			}
		}
	}
	.top-right {
	}
}
</style>
