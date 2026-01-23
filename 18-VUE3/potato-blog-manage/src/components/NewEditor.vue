<template>
	<!-- 新建编辑器 -->
	<WhiteContainer>
		<el-input v-model.trim="articleTitle" placeholder="请输入标题" class="text-2xl h-8 group">
			<template #suffix>
				<el-icon
					@click="resetNoteTitle"
					class="text-xl cursor-pointer opacity-0"
					:class="{ 'group-hover:opacity-100': articleTitle.length > 0 }"
					><CircleClose
				/></el-icon>
			</template>
		</el-input>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { CircleClose } from '@element-plus/icons-vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

import { onBeforeRouteLeave } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useNewPhotoGalleryStore } from '@/stores/newPhotoGalleryStore';
const newPhotoGalleryStore = useNewPhotoGalleryStore();
const { articleTitle, articleContent } = storeToRefs(newPhotoGalleryStore);
const { confirmLeave } = newPhotoGalleryStore;

// 重置标题
const resetNoteTitle = () => {
	articleTitle.value = '';
};

// 路由离开前确认保存
onBeforeRouteLeave(async (to, from) => {
	return await confirmLeave();
});
</script>

<style lang="scss" scoped>
:deep(.el-input) {
	.el-input__wrapper {
		box-shadow: none;
		padding: 0;
		.el-input__inner {
			color: #1e2025 !important;
		}
	}
}
</style>
