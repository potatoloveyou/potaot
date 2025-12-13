<template>
	<!-- 博客文章 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<Grouping />
		<div class="grid grid-cols-[3fr_1fr] gap-x-4 min-h-dvh">
			<div>
				<ArticleItem :sliceData />
				<el-pagination
					background
					size="small"
					layout="prev, pager, next"
					:total="articleData.count"
					:page-size="limit"
					@change="changePag"
					class="justify-center pt-4" />
			</div>
			<Label class="bg-blue-500" />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { articles } from '@/mock/mock';

import type { ArticleResponseType, ArticleItemType } from '@/type/index';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import ArticleItem from '@/components/BlogPostsView/ArticleItem.vue';
import Label from '@/components/BlogPostsView/Label.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
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
	// console.log(sliceData.value);
};

const changePag = (value: number) => {
	offset.value = (value - 1) * limit.value;
	getArticleList();
};

onMounted(() => {
	getArticleList();
});
</script>

<style lang="scss" scoped></style>
