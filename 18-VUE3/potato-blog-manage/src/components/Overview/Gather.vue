<template>
	<el-row :gutter="16" justify="space-between" class="items-center">
		<el-col :span="6" v-for="(value, index) in overLink" :key="value.name">
			<div :style="{ background: value.bgColor }" class="h-30 !p-6 flex items-center justify-between rounded-lg">
				<div class="flex flex-col">
					<text class="pb-4">{{ value.name }}</text>
					<text class="text-3xl">{{ value.totle }}</text>
				</div>
				<el-button :icon="Plus" color="#1e202514" v-if="index > 0" class="!w-12 !h-12"></el-button>
			</div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ref, reactive, toRef } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { overView } from '@/mock/mock';

// 模拟数据
const overLink = reactive([
	{
		path: '/LocalFiles',
		name: '本地文件',
		totle: '0M',
		bgColor: 'linear-gradient(180deg, #2b5aedcc 0%, #2B5AED 100%)',
	},
	{
		path: '/BlogPosts',
		name: '博客文章',
		totle: '0',
		bgColor: 'linear-gradient(180deg, #ff600829 0%, #ff60083d 100%)',
	},
	{
		path: '/PhotographyGallery',
		name: '摄影图库',
		totle: '0',
		bgColor: 'linear-gradient(180deg, #25df0629 0%, #25df063d 100%)',
	},
	{
		path: '/HandwrittenNotes',
		name: '随手笔记',
		totle: '0',
		bgColor: 'linear-gradient(180deg, #00c9f529 0%, #00c9f53d 100%)',
	},
]);
const drawGatherData = async () => {
	let res = await overView.data;
	console.log(res);
	overLink[0].totle = res.file;
	overLink[1].totle = res.article;
	overLink[2].totle = res.gallery;
	overLink[3].totle = res.diary;

	// await overLink.forEach((item) => {
	// 	item.totle = overView[item.path].totle;
	// });
};

onMounted(() => {
	drawGatherData();
});
</script>

<style lang="scss" scoped></style>
