<template>
	<!-- 博客文章 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<Grouping />
		<div class="grid grid-cols-[3fr_1fr] gap-x-4 min-h-dvh">
			<ArticleList />
			<Label class="bg-blue-500" />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import ArticleList from '@/components/BlogPostsView/ArticleList.vue';
import Label from '@/components/BlogPostsView/Label.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
</script>

<style lang="scss" scoped></style>
