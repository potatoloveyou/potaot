<template>
	<!-- 摄影图库 -->
	<el-scrollbar noresize class="min-height pr-5">
		<Topic name="摄影图库" @search="changeSearch" :isSearch="true" />
		<Grouping :groupingData v-model:selectTagId="selectTagId" />
		<!-- <div class="flex flex-col flex-1">
		</div> -->
		<Gallery :data="photoGalleryData" :sliceData v-model:limit="limit" v-model:page="page" />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { photoGallery } from '@/mock/mock';

import { storeToRefs } from 'pinia';
import { usePhotoGalleryStore } from '@/stores/photoGallery';
const photoGalleryStore = usePhotoGalleryStore();
const { groupingData } = storeToRefs(photoGalleryStore);
const { getGroupingList } = photoGalleryStore;

import type { PhotoGalleryType, PhotoGalleryItemType } from '@/type/photoGallery.type';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import Gallery from '@/components/PhotoGalleryView/Gallery.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

// 选中标签ID
const selectTagId = ref<number | string>(0);

const sliceData = ref<PhotoGalleryItemType[]>([]);
// 分页大小
const limit = ref(5);
// 页码
const page = ref(1);
const offset = computed(() => (page.value - 1) * limit.value);

// 查询参数
const queryParams = computed(() => ({
	selectTagId: selectTagId.value,
	limit: limit.value,
	offset: offset.value,
}));

const photoGalleryData = ref<PhotoGalleryType<PhotoGalleryItemType>>({
	count: 0,
	list: [],
});
const getPhotoGalleryList = async () => {
	const res = await photoGallery.data;
	photoGalleryData.value = res;
	sliceData.value = photoGalleryData.value.list.slice(offset.value, limit.value + offset.value);
	console.log(sliceData.value);
};

onMounted(() => {
	Promise.all([getGroupingList(), getPhotoGalleryList()]);
});

watch(
	() => queryParams.value,
	(newValue, oldValue) => {
		if (newValue.selectTagId !== oldValue.selectTagId) {
			console.log('点击了标签');
			page.value = 1;
		}
		// getPhotoGalleryList();
	},
	{ deep: true },
);
</script>

<style lang="scss" scoped></style>
