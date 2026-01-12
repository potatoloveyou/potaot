<template>
	<!-- 随手笔记 -->
	<div class="h-full flex flex-col">
		<Topic name="随手笔记" @search="changeSearch" :isSearch="true" />
		<div class="flex-1 grid grid-cols-[3fr_1.6fr] gap-x-4">
			<NoteList :data="diaryData" @loadMore="loadMore" />
			<NoteEditor />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DiaryType, DiaryItemType } from '@/type/diary.type';
import { diary } from '@/mock/mock';

import Topic from '@/components/Topic.vue';
import NoteList from '@/components/HandwrittenNotesView/NoteList.vue';
import NoteEditor from '@/components/HandwrittenNotesView/NoteEditor.vue';

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

const diaryData = ref<DiaryType<DiaryItemType>>({
	count: 0,
	list: [],
});
const getDiaryList = async () => {
	const res = await diary.data;

	const newList = res.list.slice(offset.value, limit.value + offset.value);
	if (newList.length === 0) {
		finished.value = true;
		return;
	}
	diaryData.value = {
		count: res.count,
		list: [...diaryData.value.list, ...newList],
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
	await getDiaryList();

	// 给虚拟列表一点缓冲
	await nextTick();
	loading.value = false;
};

onMounted(() => {
	Promise.all([getDiaryList()]);
});
</script>

<style lang="scss" scoped></style>
