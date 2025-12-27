<template>
	<!-- 随手笔记 -->
	<div class="h-full flex flex-col">
		<Topic name="博客文章" @search="changeSearch" :isSearch="true" />
		<div class="flex-1 grid grid-cols-[3fr_1.6fr] gap-x-4">
			<NoteList />
			<NoteEditor />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Topic from '@/components/Topic.vue';
import NoteList from '@/components/HandwrittenNotesView/NoteList.vue';
import NoteEditor from '@/components/HandwrittenNotesView/NoteEditor.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
</script>

<style lang="scss" scoped></style>
