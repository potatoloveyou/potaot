<template>
	<!-- 本地文件 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="本地文件" @search="changeSearch" :isSearch="false" class="!mb-4">
			<template #custom>
				<div class="grid grid-cols-[1fr_auto] items-center">
					<el-text class="!mr-4">图片、视频、音频不超过20M</el-text>
					<Upload />
				</div>
			</template>
		</Topic>
		<Grouping class="!mb-4" />
		<Files class="flex-1" />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useGroupingStore } from '@/stores/LocalFilesStores';
const { stateData, groupingData, exclude } = storeToRefs(useGroupingStore());

import Topic from '@/components/Topic.vue';
import Upload from '@/components/LocalFilesView/Upload.vue';
import Grouping from '@/components/Grouping.vue';
import Files from '@/components/LocalFilesView/Files.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

provide('stateData', stateData);
provide('groupingData', groupingData);
provide('exclude', exclude);

const getGroupingList = async () => {
	// stateData.value = state.data;
	// groupingData.value = grouping.data;
};

onMounted(() => {
	getGroupingList();
});
</script>

<style lang="scss" scoped></style>
