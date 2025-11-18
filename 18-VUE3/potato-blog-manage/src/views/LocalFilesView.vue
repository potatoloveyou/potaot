<template>
	<!-- 本地文件 -->
	<Topic name="本地文件" @search="changeSearch" :isSearch="false" class="!mb-4">
		<template #custom>
			<div class="grid grid-cols-[1fr_auto] items-center">
				<el-text class="!mr-4">图片、视频、音频不超过20M</el-text>
				<Upload />
			</div>
		</template>
	</Topic>
	<Grouping />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { state, grouping } from '@/mock/mock';
import type { StateType, GroupingType } from '@/type/grouping.type';

import Topic from '@/components/Topic.vue';
import Upload from '@/components/LocalFilesView/Upload.vue';
import Grouping from '@/components/Grouping.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

const stateData = ref<StateType[]>([]);
const groupingData = ref<GroupingType>({ count: 0, list: [] });
const exclude = computed(() => {
	let arr: Array<string | number> = [];
	let n = groupingData.value.count;
	groupingData.value.list.forEach((item) => {
		arr.push(item.id);
		n -= item.value;
	});
	return { id: arr.join(','), name: '未分组', value: n };
});
provide('stateData', stateData);
provide('groupingData', groupingData);
provide('exclude', exclude);

const getGroupingList = async () => {
	stateData.value = state.data;
	groupingData.value = grouping.data;
};

onMounted(() => {
	getGroupingList();
});
</script>

<style lang="scss" scoped></style>
