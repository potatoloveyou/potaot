<template>
	<!-- 分组标签 -->
	<el-scrollbar view-class="el-scrollbar-view">
		<div class="h-full flex items-center tag-container">
			<el-button
				:type="getTagType(0)"
				:plain="!isSelected(0)"
				round
				size="small"
				@click="changeTag(0)"
				class="!mr-2 !ml-0"
				>全部</el-button
			>

			<el-button
				:type="getTagType(item.id)"
				:plain="!isSelected(item.id)"
				round
				size="small"
				@click="changeTag(item.id)"
				v-for="item in stateData"
				class="!mr-2 !ml-0 !hover:bg-[#409eff]"
				>{{ item.name }} {{ item.value }}</el-button
			>

			<el-button
				:type="getTagType(exclude.id)"
				:plain="!isSelected(exclude.id)"
				round
				size="small"
				@click="changeTag(exclude.id)"
				class="!mr-2 !ml-0">
				{{ exclude.name }} {{ exclude.value }}
			</el-button>

			<el-button
				:type="getTagType(item.id)"
				:plain="!isSelected(item.id)"
				round
				size="small"
				@click="changeTag(item.id)"
				v-for="item in groupingData?.list"
				class="!mr-2 !ml-0"
				>{{ item.name }} {{ item.value }}</el-button
			>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { StateType, GroupingType } from '@/type/grouping.type';

import { storeToRefs } from 'pinia';
import { useGroupingStore } from '@/stores/LocalFilesStores';
const { stateData, groupingData, exclude } = storeToRefs(useGroupingStore());


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

<style lang="scss" scoped>
.tag-container {
	& > .el-button {
		border-color: #f4f4f5;
		// color: #000;
		&:hover {
			background-color: #79bbff;
			border-color: #79bbff;
		}
	}
}
</style>
