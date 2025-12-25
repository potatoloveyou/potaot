<template>
	<!-- 博客文章 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<Grouping :stateData :groupingData @update:selectTagId="changeTag" />
		<div class="grid grid-cols-[3fr_1fr] gap-x-4 min-h-dvh">
			<div>
				<ArticleItem :sliceData />
				<el-pagination
					background
					layout="prev, pager, next"
					:total="articleData.count"
					:page-size="limit"
					@change="changePag"
					class="justify-center pt-4" />
			</div>
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

import type { ArticleResponseType, ArticleItemType } from '@/type/index';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import ArticleItem from '@/components/BlogPostsView/ArticleItem.vue';
import Label from '@/components/BlogPostsView/Label.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
// 切换标签id
const changeTag = (id: number | string) => {
	console.log('changeTag:', id);
};

const articleData = ref<ArticleResponseType<ArticleItemType>>({
	count: 0,
	list: [],
});
const sliceData = ref<ArticleItemType[]>([]);
const limit = ref(5);
const offset = ref(0);

const getArticleList = async () => {
	const res = await articles.data;
	articleData.value = res;
	sliceData.value = articleData.value.list.slice(offset.value, limit.value + offset.value);
};

// 分页回调
const changePag = (value: number) => {
	offset.value = (value - 1) * limit.value;
	getArticleList();
};

onMounted(() => {
	getArticleList();
	getGroupingList();
});
</script>

<style lang="scss" scoped></style>
