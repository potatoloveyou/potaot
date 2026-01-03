<template>
	<!-- 总览 -->
	<el-scrollbar noresize class="min-height flex flex-col">
		<Topic @search="changeSearch" :isSearch="false" />
		<Gather />
		<div class="flex-1 grid grid-cols-[2fr_1.5fr] gap-x-4 h-dvh">
			<Chart />
			<Comment :data="commentData" @loadMore="loadMore" />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { comment } from '@/mock/mock';

import type { CommentType, CommentItemType } from '@/type/comment.type';

import Topic from '@/components/Topic.vue';
import Gather from '@/components/Overview/Gather.vue';

import Chart from '@/components/Overview/Chart.vue';
import Comment from '@/components/Overview/Comment.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

// 分页大小
const limit = ref(10);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);
const loading = ref(false);
const finished = ref(false);

// 查询参数
const queryParams = computed(() => ({
	limit: limit.value,
	offset: offset.value,
}));

const commentData = ref<CommentType<CommentItemType>>({
	total: 0,
	list: [],
});
// 获取评论
const getCommentData = async () => {
	let res = await comment.data;

	const newList = res.list.slice(offset.value, limit.value + offset.value);
	if (newList.length === 0) {
		finished.value = true;
		return;
	}
	commentData.value = {
		total: res.total,
		list: [...commentData.value.list, ...newList],
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
	await getCommentData();

	// 给虚拟列表一点缓冲
	await nextTick();
	loading.value = false;
};

onMounted(() => {
	getCommentData();
});
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
	display: grid !important;
	height: 100%;
	grid-template-rows: auto auto 1fr;
}
</style>
