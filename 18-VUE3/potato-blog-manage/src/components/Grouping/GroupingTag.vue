<template>
	<!-- 分组标签 -->
	<el-scrollbar view-class="el-scrollbar-view">
		<div class="h-full flex items-center">
			<el-tag :type="getTagType(0)" effect="light" round @click="changeTag(0)" class="!mr-2 cursor-pointer">
				全部 {{ groupingData.count }}
			</el-tag>
			<el-tag
				:type="getTagType(item.id)"
				effect="light"
				round
				@click="changeTag(item.id)"
				v-for="item in stateData"
				class="!mr-2 cursor-pointer">
				{{ item.name }} {{ item.value }}
			</el-tag>
			<el-tag
				:type="getTagType(exclude.id)"
				effect="light"
				round
				@click="changeTag(exclude.id)"
				class="!mr-2 cursor-pointer">
				{{ exclude.name }} {{ exclude.value }}
			</el-tag>
			<el-tag
				:type="getTagType(item.id)"
				effect="light"
				round
				@click="changeTag(item.id)"
				v-for="item in groupingData?.list"
				class="!mr-2 cursor-pointer">
				{{ item.name }} {{ item.value }}
			</el-tag>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { StateType, GroupingType } from '@/type/grouping.type';

const stateData = inject<Ref<StateType[]> | null>('stateData', null);
const groupingData = inject<Ref<GroupingType> | null>('groupingData', null);
const exclude = inject<ComputedRef<any> | null>('exclude', null);

const selectTagId = ref<number | string>(0);
const changeTag = (id: number | string) => {
	selectTagId.value = id;
	console.log('selected tag id:', selectTagId.value);
};

// 判断是否选中（返回 boolean）
const isSelected = (id: number | string) => selectTagId.value === id;

type TagType = 'info' | 'primary' | 'success' | 'warning' | 'danger';
// 根据 id 返回要绑定到 el-tag 的 type
const getTagType = (id: number | string): TagType => {
	return isSelected(id) ? 'primary' : 'info';
};

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
