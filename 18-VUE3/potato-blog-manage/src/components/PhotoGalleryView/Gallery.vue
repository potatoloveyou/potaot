<template>
	<WhiteContainer class="grid grid-cols-4 gap-y-12 place-items-center">
		<div v-for="item in galleryData" class="h-86 group relative">
			<div class="overflow-hidden rounded-xl mb-2">
				<el-image :src="item.cover" fit="cover" class="w-full h-46" />
				<div class="w-full grid grid-cols-3 gap-1">
					<el-image v-for="value in item.content" :src="value" fit="cover" class="w-23 h-23" />
					<div v-if="item.content.length < 3" class="bg-[#1e202529]"></div>
				</div>
			</div>
			<el-text class="text-xl font-semibold text-[#1E2025]">{{ item.title }}</el-text>
			<div class="w-full flex justify-between items-center pt-2">
				<div class="[&>*]:mr-4">
					<el-text class="text-[#666]">查看 {{ item.viewCount }}</el-text>
					<el-text class="text-[#666]">喜欢 {{ item.praiseCount }}</el-text>
				</div>
				<el-text class="text-[#666]">{{ item.createTime }}</el-text>
			</div>

			<div
				class="absolute top-4 right-6 opacity-0 group-hover:opacity-100 bg-[#2b5aed] flex items-center justify-around rounded-md [&>*]:hover:cursor-pointer transition-all duration-300">
				<el-button color="#2b5aed" class="p-3 iconfont icon-xiugai" @click="handleEditClick(item.id)"></el-button>
				<el-button :icon="Delete" color="#2b5aed" class="p-3 m-0" @click="handleDeleteClick(item.id)"></el-button>
			</div>
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { PhotoGalleryItem } from '@/type/photoGallery.type';

import { Delete } from '@element-plus/icons-vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

interface GalleryProps {
	galleryData: PhotoGalleryItem[];
}
const { galleryData } = defineProps<GalleryProps>();

// 编辑点击事件
const handleEditClick = (id: number | string) => {
	console.log('编辑点击事件:', id);
};

// 删除点击事件
const handleDeleteClick = (id: number | string) => {
	console.log('删除点击事件:', id);
};
</script>

<style lang="scss" scoped></style>
