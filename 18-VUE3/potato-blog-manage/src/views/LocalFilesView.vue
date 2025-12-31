<template>
	<!-- 本地文件 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="本地文件" :isSearch="false">
			<template #custom>
				<div class="grid grid-cols-[1fr_auto] items-center">
					<el-text class="mr-4">图片、视频、音频不超过20M</el-text> <Upload />
				</div>
			</template>
		</Topic>
		<Grouping :groupingData v-model:selectTagId="selectTagId" />
		<Files :groupingData :filesData v-model:limit="limit" v-model:page="page" />
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

const urls = [
	'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
	'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
	'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
	'https://pic1.arkoo.com/56D0B40F99F841DF8A2425762AE2565D/picture/o_1i4qop009177v1tgf14db15he1iaj1is.jpg',
	'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
	'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
	'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
	'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
	'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
	'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
];

// 文件列表
const filesData = ref<FileType<FileItemType>>({
	count: 0,
	list: [],
});
// 获取文件列表
const getFiles = async () => {
	const res = await files.data;
	filesData.value = {
		count: res.count,
		list: res.list.map((item: FileItemType, index: number) => ({ ...item, url: urls[index] })),
	};
};

onMounted(() => {
	getGroupingList();
	getFiles();
});

watch(
	() => queryParams.value,
	(newValue, oldValue) => {
		if (newValue.selectTagId !== oldValue.selectTagId) {
			console.log("点击了标签");
			page.value = 1;
		}
		// getFiles();
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
