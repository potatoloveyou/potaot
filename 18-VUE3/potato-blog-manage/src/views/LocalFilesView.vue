<template>
	<!-- 本地文件 -->
	<div class="grid grid-cols-[1fr_auto] items-center">
		<Topic name="本地文件" @search="changeSearch" :isSearch="false" class="!mb-4">
			<template #custom>
				<div class="grid grid-cols-[1fr_auto] items-center">
					<el-text class="!mr-4">图片、视频、音频不超过20M</el-text>
					<Upload />
				</div>
			</template>
		</Topic>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Topic from '@/components/Topic.vue';
import Upload from '@/components/LocalFilesView/Upload.vue';

// 搜索回调
const changeSearch = (value: string) => {
	console.log('我是父组件', value);
};
</script>

<style lang="scss" scoped></style>
