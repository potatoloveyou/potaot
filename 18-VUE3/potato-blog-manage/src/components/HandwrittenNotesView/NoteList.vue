<template>
	<div>
		<WhiteContainer v-for="item in sliceData" :key="item.id" class="mb-4"> </WhiteContainer>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="data.count"
			v-model:page-size="limit"
			v-model:current-page="page"
			class="justify-end pt-4" />
	</div>
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
