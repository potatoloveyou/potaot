<template>
	<!-- 本地文件 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="本地文件" :isSearch="false">
			<template #custom>
				<div class="grid grid-cols-[1fr_auto] items-center">
					<el-text class="mr-4">图片、视频、音频不超过20M</el-text>
					<Upload />
				</div>
			</template>
		</Topic>
		<Grouping :groupingData />
		<Files :groupingData />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { uselocalFilesStore } from '@/stores/localFilesStore';
const localFilesStore = uselocalFilesStore();
const { groupingData, selectTagId } = storeToRefs(localFilesStore);
const { getGroupingList } = localFilesStore;

import Topic from '@/components/Topic.vue';
import Upload from '@/components/LocalFilesView/Upload.vue';
import Grouping from '@/components/Grouping.vue';
import Files from '@/components/LocalFilesView/Files.vue';

onMounted(() => {
	getGroupingList();
});
watch(
	() => selectTagId.value,
	(newVal) => {
		console.log('newVal:', newVal);
	},
);
</script>

<style lang="scss" scoped></style>
