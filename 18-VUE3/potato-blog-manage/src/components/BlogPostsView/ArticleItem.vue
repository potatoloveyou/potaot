<template>
	<!-- 文章列表 -->
	<WhiteContainer class="w-full h-48 mb-4" v-for="item in sliceData">
		<div class="h-full grid grid-cols-[auto_1fr]">
			<div class="w-58 mr-4 rounded-xl overflow-hidden relative">
				<el-image :src="item.cover" lazy fit="scale-down" class="h-full" />
				<div v-if="item.state" class="absolute bottom-0 w-full bg-[#2b5aedcc] text-white flex justify-center py-3">
					未发布
				</div>
			</div>
			<div class="flex flex-col justify-center [&>*]:mb-4 [&>*]:w-full">
				<el-text class="text-2xl font-semibold text-[#1E2025]">{{ item.title }}</el-text>
				<el-text :line-clamp="lineClamp" class="h-12 text-base">{{ item.introduce }}</el-text>
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<el-text size="small" class="text-[#1e2025b8]">{{ item.label }} {{ item.region }}</el-text>
						<el-text size="small" type="info" class="mx-4">{{ item.createTime }}</el-text>

						<div v-for="icon in iconItems" class="flex items-center mr-3 [&>*]:text-[#909399]">
							<el-icon class="mr-1 text-sm" v-if="icon.icon.name != 'Pointer'">
								<component :is="icon.icon" />
							</el-icon>
							<span v-else class="iconfont icon-dianzan"></span>
							<el-text size="small">{{ item[icon.value] }}</el-text>
						</div>
					</div>

					<div
						class="flex items-center [&>*]:mr-5 [&>*]:cursor-pointer [&>*]:text-[#909399] [&>*:hover]:text-[#2B5AED] text-xl">
						<el-tooltip :content="item.state ? '发布' : '撤回'" placement="top">
							<span v-if="item.state" class="iconfont icon-fabu"></span>
							<span v-else class="iconfont icon-chehui"></span>
						</el-tooltip>
						<el-tooltip content="编辑" placement="top">
							<span class="iconfont icon-xiugai"></span>
						</el-tooltip>
						<el-tooltip content="删除" placement="top">
							<el-icon><Delete /></el-icon>
						</el-tooltip>
					</div>
				</div>
			</div>
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';

import type { ArticleItemType } from '@/type/index';

import { View, Pointer, ChatLineSquare, Delete } from '@element-plus/icons-vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

interface ArticleItemProps {
	sliceData: ArticleItemType[];
	lineClamp?: number | string;
}

const { sliceData, lineClamp = 2 } = defineProps<ArticleItemProps>();

interface IconItem {
	icon: Component;
	text: string;
	value: string;
}
const iconItems: IconItem[] = [
	{
		icon: View,
		text: '查看',
		value: 'viewCount',
	},
	{
		icon: Pointer,
		text: '点赞',
		value: 'praiseCount',
	},
	{
		icon: ChatLineSquare,
		text: '评论',
		value: 'commentCount',
	},
];

onMounted(() => {
	// console.log(sliceData);
});
</script>

<style lang="scss" scoped>
:deep(.el-popover__title) {
	margin: 0;
	background-color: red;
}
:deep(.el-popper) {
	background-color: red;
}
</style>
