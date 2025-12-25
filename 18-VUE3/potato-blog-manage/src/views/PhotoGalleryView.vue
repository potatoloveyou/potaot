<template>
	<!-- 摄影图库 -->
	<el-scrollbar noresize class="min-height">
		<Topic name="摄影图库" @search="changeSearch" :isSearch="true" />
		<Grouping :groupingData="groupingData" @update:selectTagId="changeTag" />
		<div class="flex flex-col flex-1">
			<Gallery :galleryData="sliceData" />
			<el-pagination
				background
				layout="prev, pager, next"
				:total="photoGalleryData.count"
				:page-size="limit"
				@change="changePag"
				class="justify-center pt-4" />
		</div>
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

import type { PhotoGallery, PhotoGalleryItem } from '@/type/photoGallery.type';

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';
import Gallery from '@/components/PhotoGalleryView/Gallery.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

// 切换标签id
const changeTag = (id: number | string) => {
	console.log('changeTag:', id);
};

const photoGalleryData = ref<PhotoGallery<PhotoGalleryItem>>({
	count: 100,
	list: [],
});
const sliceData = ref<PhotoGalleryItem[]>([]);
const limit = ref(5);
const offset = ref(0);

const getPhotoGalleryList = async () => {
	const res = await photoGallery.data;
	photoGalleryData.value = res;
	sliceData.value = photoGalleryData.value.list.slice(offset.value, limit.value + offset.value);
	console.log(photoGalleryData.value);
};

// 分页回调
const changePag = (value: number) => {
	offset.value = (value - 1) * limit.value;
	getPhotoGalleryList();
};

onMounted(() => {
	getGroupingList();
	getPhotoGalleryList();
});
</script>

<style lang="scss" scoped></style>
