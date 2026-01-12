<template>
	<!-- 博客文章 -->
	<div class="w-full h-full flex flex-col">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<Grouping :stateData :groupingData v-model:selectTagId="selectTagId" />
		<div class="grid grid-cols-[3fr_1fr] gap-x-4 h-139">
			<ArticleItem :data="articleData" @loadMore="loadMore" />
			<Label />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { articles } from '@/mock/mock';

import { storeToRefs } from 'pinia';
import { useBlogPostsStore } from '@/stores/blogPostsStore';
const blogPostsStore = useBlogPostsStore();
const { stateData, groupingData } = storeToRefs(blogPostsStore);
const { getGroupingList } = blogPostsStore;

import type { ArticleType, ArticleItemType } from '@/type/index';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import ArticleItem from '@/components/BlogPostsView/ArticleItem.vue';
import Label from '@/components/BlogPostsView/Label.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

// 选中标签ID
const selectTagId = ref<number | string>(0);

// 分页大小
const limit = ref(10);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);
const loading = ref(false);
const finished = ref(false);

// 查询参数
const queryParams = computed(() => ({
	selectTagId: selectTagId.value,
	limit: limit.value,
	offset: offset.value,
}));

const articleData = ref<ArticleType<ArticleItemType>>({
	count: 0,
	list: [],
});
const getArticleList = async () => {
	const res = await articles.data;

	const newList = res.list.slice(offset.value, limit.value + offset.value);
	if (newList.length === 0) {
		finished.value = true;
		return;
	}

	articleData.value = {
		count: res.count,
		list: [...articleData.value.list, ...newList],
	};

	if (res.list.length < limit.value) {
		finished.value = true; // 没有更多了
	}
};

// 到底触发
const loadMore = async () => {
	console.log('到底了');
	if (loading.value || finished.value) return;
	loading.value = true;
	page.value++;
	await getArticleList();

	// 给虚拟列表一点缓冲
	await nextTick();
	loading.value = false;
};

onMounted(() => {
	Promise.all([getGroupingList(), getArticleList()]);
});
</script>

<style lang="scss" scoped></style>
