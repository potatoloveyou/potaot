<template>
	<el-scrollbar noresize class="h-[calc(100dvh-4rem-2.5rem-2rem-1rem)]">
		<WhiteContainer v-for="item in sliceData" :key="item.id" class="mb-4">
			<div class="w-full flex flex-col justify-center [&>*]:w-full">
				<el-text class="text-xl font-semibold text-[#1E2025] mb-2">{{ item.title }}</el-text>
				<el-text size="small" type="info" class="mx-4 mb-4">{{ item.createTime }}</el-text>
				<el-text class="text-base">{{ item.introduce }}</el-text>
			</div>
		</WhiteContainer>
		<el-pagination
			backgrounds
			layout="prev, pager, next"
			:total="data.count"
			v-model:page-size="limit"
			v-model:current-page="page"
			class="justify-end pt-4 w-full" />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DiaryType, DiaryItemType } from '@/type/diary.type';

import WhiteContainer from '@/components/WhiteContainer.vue';

interface NoteListProps {
	data: DiaryType<DiaryItemType>;
	sliceData: DiaryItemType[];
}
const { data, sliceData } = defineProps<NoteListProps>();

const limit = defineModel<number>('limit', { default: 5 });
const page = defineModel<number>('page', { default: 1 });
</script>

<style lang="scss" scoped></style>
