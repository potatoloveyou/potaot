<template>
	<!-- 搜索菜谱 -->
	<div class="search-recipe-top">
		<div class="top-left">
			<ul>
				<li>综合</li>
				<li>收藏高</li>
				<li>学做多</li>
			</ul>
		</div>
		<div class="top-right">
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

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import SearchRecipeCard from '@/components/Search/SearchNav/SearchRecipe/SearchRecipeCard.vue';
import { getSearch } from '@/apis/api';

import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

// 更新偏移量
let offset = ref(0);
// vant列表组件加载更多
const loading = ref(true);
const finished = ref(false);

// 搜索列表
const searchs = ref([]);

const searchList = async () => {
	await getSearch({ keyword: searchStore.searchValue, offset: offset.value * 20 })
		.then((res) => {
			searchs.value = [...searchs.value, ...res.data.result.list];

			nextTick(() => {
				offset.value++;
				// console.log(123);
			});
		})
		.catch(() => {
			nextTick(() => {
				finished.value = true;
			});
		})
		.finally(() => {
			nextTick(() => {
				loading.value = false;
			});
		});
};

// 组件创建的时候调用
onMounted(() => {
	searchList();
});

const onLoad = () => {
	// 异步更新数据
	console.log('触底了', offset.value);
	searchList();
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
