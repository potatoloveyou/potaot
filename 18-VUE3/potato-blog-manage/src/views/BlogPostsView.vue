<template>
	<!-- 博客文章 -->
	<el-scrollbar noresize class="min-height pr-5">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<Grouping :stateData :groupingData v-model:selectTagId="selectTagId" />
		<div class="grid grid-cols-[3fr_1fr] gap-x-4 min-h-dvh">
			<ArticleItem :data="articleData" :sliceData v-model:limit="limit" v-model:page="page" />
			<Label />
		</div>
	</el-scrollbar>
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

const sliceData = ref<ArticleItemType[]>([]);
// 分页大小
const limit = ref(5);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);

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
	articleData.value = res;
	sliceData.value = articleData.value.list.slice(offset.value, limit.value + offset.value);
};
onMounted(() => {
	Promise.all([getGroupingList(), getArticleList()]);
});

watch(
	() => queryParams.value,
	(newValue, oldValue) => {
		if (newValue.selectTagId !== oldValue.selectTagId) {
			console.log('点击了标签');
			page.value = 1;
		}
		// console.log(123);
		getArticleList();
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
