<template>
	<!-- 随手笔记 -->
	<div class="h-full flex flex-col">
		<Topic name="随手笔记" @search="changeSearch" :isSearch="true" />
		<div class="flex-1 grid grid-cols-[3fr_1.6fr] gap-x-4">
			<NoteList :data="diaryData" :sliceData v-model:limit="limit" v-model:page="page" />
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

const sliceData = ref<DiaryItemType[]>([]);
// 分页大小
const limit = ref(4);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);

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
	diaryData.value = res;
	sliceData.value = diaryData.value.list.slice(offset.value, limit.value + offset.value);
};

onMounted(() => {
	Promise.all([getDiaryList()]);
});

watch(
	() => queryParams.value,
	() => {
		getDiaryList();
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
