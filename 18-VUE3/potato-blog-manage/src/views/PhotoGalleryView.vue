<template>
	<!-- 摄影图库 -->
	<div>
		<Topic name="摄影图库" @search="changeSearch" :isSearch="true" />
		<Grouping :groupingData="groupingData" @update:selectTagId="changeTag" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { usePhotoGalleryStore } from '@/stores/photoGallery';
const photoGalleryStore = usePhotoGalleryStore();
const { groupingData } = storeToRefs(photoGalleryStore);
const { getGroupingList } = photoGalleryStore;

import Topic from '@/components/Topic.vue';
import Grouping from '@/components/Grouping.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};

// 切换标签id
const changeTag = (id: number | string) => {
	console.log('changeTag:', id);
};

onMounted(() => {
	getGroupingList();
});
</script>

<style lang="scss" scoped></style>
