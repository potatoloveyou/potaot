<template>
	<!-- 分组标签 -->
	<el-scrollbar class="pb-4 pr-10">
		<div class="h-full flex items-center tag-container">
			<el-button
				:type="isSelected(0) ? 'primary' : 'info'"
				:plain="!isSelected(0)"
				round
				:color="isSelected(0) ? '#2b5aed' : ''"
				size="small"
				@click="changeTag(0)"
				class="mr-2 ml-0 hover:bg-[#6b8cf2]">
				全部 {{ groupingData?.count }}
			</el-button>

			<el-button
				:type="isSelected(item.id) ? 'primary' : 'info'"
				:plain="!isSelected(item.id)"
				round
				:color="isSelected(item.id) ? '#2b5aed' : ''"
				size="small"
				@click="changeTag(item.id)"
				v-for="item in stateData"
				class="mr-2 ml-0 hover:bg-[#6b8cf2]">
				{{ item.name }} {{ item.value }}
			</el-button>

			<el-button
				:type="isSelected(item.id) ? 'primary' : 'info'"
				:plain="!isSelected(item.id)"
				round
				:color="isSelected(item.id) ? '#2b5aed' : ''"
				size="small"
				@click="changeTag(item.id)"
				v-for="item in groupingData?.list"
				class="mr-2 ml-0 hover:bg-[#6b8cf2]"
				>{{ item.name }} {{ item.value }}
			</el-button>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { uselocalFilesStore } from '@/stores/localFilesStore';
const localFilesStore = uselocalFilesStore();
const { selectTagId } = storeToRefs(localFilesStore);

import type { StateType, GroupingType } from '@/type/grouping.type';

interface GroupingTagProps {
	stateData?: StateType[];
	groupingData: GroupingType;
}

const { stateData = [], groupingData } = defineProps<GroupingTagProps>();

// 切换标签id
const changeTag = (id: number | string) => {
	selectTagId.value = id;
};

// 判断是否选中（返回 boolean）
const isSelected = (id: number | string) => selectTagId.value === id;

onMounted(() => {});
</script>

<style lang="scss" scoped>
.tag-container {
	& > .el-button {
		border-color: #f4f4f4;
	}
}
</style>
