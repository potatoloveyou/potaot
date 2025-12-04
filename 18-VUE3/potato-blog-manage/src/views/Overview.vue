<template>
	<!-- 总览 -->
	<el-scrollbar noresize class="min-height">
		<Topic @search="changeSearch" :isSearch="false" />
		<Gather />
		<div class="grid grid-cols-[2fr_1.5fr] gap-x-4">
			<Chart />
			<Comment />
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import Topic from '@/components/Topic.vue';
import Gather from '@/components/Overview/Gather.vue';

import Chart from '@/components/Overview/Chart.vue';
import Comment from '@/components/Overview/Comment.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
	display: grid !important;
	height: 100%;
	grid-template-rows: auto auto 1fr;
}
</style>
