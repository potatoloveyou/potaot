<template>
	<section class="search-homepage">
		<!-- history 历史搜索 -->
		<div class="history" v-show="!searchStore.searchValue">
			<div class="top-text">
				历史搜索
				<van-icon name="delete-o" size="1.2rem" @click="searchStore.deleteHistory" />
			</div>

			<ul class="list" :class="expandHistory ? 'show-history' : ''">
				<li class="item" v-for="item in searchStore.historyList" @click="amendValue(item)">{{ item }}</li>
				<van-icon name="arrow-down" class="down-icon" size="1.2rem" @click="showHistory" v-if="!expandHistory" />
			</ul>
		</div>

		<!-- 当季热门 -->
		<div class="popular" v-show="!searchStore.searchValue">
			<div class="top-text">当季热门</div>

			<ul class="list">
				<li class="item" v-for="popularitem in popularList.slice(0, 10)" @click="amendValue(popularitem.title)">
					{{ popularitem.title }}
				</li>
			</ul>
		</div>

		<!-- 分类 -->
		<div class="classification" v-show="!searchStore.searchValue">
			<div class="top-text">
				<div class="text-left">分类</div>
				<div class="text-right" @click="redirectRecipe">全部分类</div>
			</div>

			<ul class="list">
				<li class="item" v-for="item in classification" @click="amendValue(item)">{{ item }}</li>
			</ul>
		</div>
	</section>

	<!-- 搜索建议 -->
	<div class="suggest" v-show="searchStore.searchValue">
		<ul class="suggest-list">
			<li class="suggest-item" v-for="sugges in searchStore.suggestList" @click="amendValue(sugges.name)">
				<div class="sugges-name">{{ sugges.name }}</div>
				<div class="sugges-from" v-if="sugges.tag">{{ sugges.tag.name }}</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getHotSearch } from '@/apis/api';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();

import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
	searchvalue: String,
});

const classification = ref([
	'健脾养胃',
	'清热去火',
	'感冒发烧',
	'养发',
	'润肺止咳',
	'母婴辅食',
	'下饭菜',
	'快手菜',
	'减脂食谱',
]);

/**
 * popular	当季热门
 */
const popularList = ref([]);
const hotSearch = async () => {
	await getHotSearch().then((res) => {
		popularList.value = res.data.result.suggestdetails;
	});
};

/**
 * amendValue	 点击修改搜索框内容
 */
const amendValue = (value) => {
	searchStore.searchValue = value;
	searchStore.addNewHistory(value);
	router.push('/search/searchNav');
};

// 组件创建的时候调用
onMounted(() => {
	searchStore.searchValue ? '' : hotSearch();
});

// 跳转到食谱
const redirectRecipe = () => {
	router.push('/recipe');
};

// 展开历史记录
const expandHistory = ref(false);
const showHistory = () => {
	expandHistory.value = true;
};
</script>

<style lang="scss" scoped>
.search-homepage {
	padding: 0 0.8rem;
}
.history {
	ul.list {
		position: relative;
		height: 3rem;
		overflow: hidden;
		.down-icon {
			position: absolute;
			right: 0;
			top: 0.5rem;
		}
	}
	ul.show-history {
		height: auto;
	}
}
.top-text {
	display: flex;
	justify-content: space-between;
	color: #999;
	font-weight: bold;
	margin: 1rem 0;
}
ul.list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 1rem;
}
li.item {
	padding: 0.5rem 0.8rem;
	border-radius: 1rem;
	font-size: 0.9rem;
	margin: 0 0.5rem 1rem 0;
	background-color: rgba(128, 128, 128, 0.1);
}

.suggest {
	padding: 0 0.8rem;
	ul.suggest-list {
		li.suggest-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.1rem;
			padding: 0.5rem 0;
			.sugges-from {
				padding: 0.5rem 0.8rem;
				border-radius: 1rem;
				font-size: 0.9rem;
				background-color: rgba(128, 128, 128, 0.1);
			}
		}
	}
}
</style>
