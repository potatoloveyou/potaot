<template>
	<!-- 本地文件 -->
	<el-scrollbar noresize class="min-height pr-5">
		<Topic name="本地文件" :isSearch="false">
			<template #custom>
				<div class="grid grid-cols-[1fr_auto] items-center">
					<el-text class="mr-4">图片、视频、音频不超过20M</el-text> <Upload />
				</div>
			</template>
		</Topic>
		<Grouping :groupingData v-model:selectTagId="selectTagId" />
		<Files :groupingData :data="filesData" :sliceData v-model:limit="limit" v-model:page="page" />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { FileType, FileItemType } from '@/type/files.type';
import { files } from '@/mock/mock';

import { storeToRefs } from 'pinia';
import { uselocalFilesStore } from '@/stores/localFilesStore';
const localFilesStore = uselocalFilesStore();
const { groupingData } = storeToRefs(localFilesStore);
const { getGroupingList } = localFilesStore;

import Topic from '@/components/Topic.vue';
import Upload from '@/components/LocalFilesView/Upload.vue';
import Grouping from '@/components/Grouping.vue';
import Files from '@/components/LocalFilesView/Files.vue';

// 选中标签ID
const selectTagId = ref<number | string>(0);

const sliceData = ref<FileItemType[]>([]);
// 分页大小
const limit = ref(10);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);

// 查询参数
const queryParams = computed(() => ({
	selectTagId: selectTagId.value,
	limit: limit.value,
	offset: offset.value,
}));

// 文件列表
const filesData = ref<FileType<FileItemType>>({
	count: 0,
	list: [],
});
// 获取文件列表
const getFiles = async () => {
	const res = await files.data;
	// filesData.value = {
	// 	count: res.count,
	// 	list: res.list.map((item: FileItemType, index: number) => ({ ...item, url: urls[index] })),
	// };
	filesData.value = res;
	sliceData.value = filesData.value.list.slice(offset.value, limit.value + offset.value);
};

onMounted(() => {
	Promise.all([getGroupingList(), getFiles()]);
});

watch(
	() => queryParams.value,
	(newValue, oldValue) => {
		if (newValue.selectTagId !== oldValue.selectTagId) {
			console.log('点击了标签');
			page.value = 1;
		}
		getFiles();
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
