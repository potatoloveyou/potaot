<template>
	<!-- 文章列表 -->
	<div>
		<WhiteContainer class="w-full h-48 mb-4" v-for="item in sliceData">
			<div class="h-full grid grid-cols-[auto_1fr]">
				<div class="w-58 mr-4 rounded-xl overflow-hidden relative">
					<el-image :src="item.cover" lazy fit="scale-down" class="h-full" />
					<div v-if="item.state" class="absolute bottom-0 w-full bg-[#2b5aedcc] text-white flex justify-center py-3">
						未发布
					</div>
				</div>
				<div class="flex flex-col justify-center [&>*]:mb-4 [&>*]:w-full">
					<el-text class="text-xl font-semibold text-[#1E2025]">{{ item.title }}</el-text>
					<el-text :line-clamp="lineClamp" class="h-12 text-base">{{ item.introduce }}</el-text>
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<el-text size="small" class="text-[#1e2025b8]">{{ item.label }} {{ item.region }}</el-text>
							<el-text size="small" type="info" class="mx-4">{{ item.createTime }}</el-text>

							<div v-for="icon in iconItems" :key="icon.value" class="flex items-center mr-3 [&>*]:text-[#909399]">
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
								<span v-if="item.state" class="iconfont icon-fabu" @click="handlePublishClick(item.id)"></span>
								<span v-else class="iconfont icon-chehui" @click="handleRevokeClick(item.id)"></span>
							</el-tooltip>
							<el-tooltip content="编辑" placement="top">
								<span class="iconfont icon-xiugai" @click="handleEditClick(item.id)"></span>
							</el-tooltip>
							<el-popover :visible="currentId === item.id" trigger="click" title="确定删除" placement="top-end">
								<template #reference>
									<el-icon @click="currentId = item.id"><Delete /></el-icon>
								</template>
								<template #default>
									<el-text>删除后不可恢复</el-text>
									<div class="mt-4 flex justify-end">
										<el-button type="info" plain size="small" @click="currentId = null">取消</el-button>
										<el-button type="primary" size="small" @click="removeArticle(item.id)">确定</el-button>
									</div>
								</template>
							</el-popover>
						</div>
					</div>
				</div>
			</div>
		</WhiteContainer>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="data.count"
			v-model:page-size="limit"
			v-model:current-page="page"
			class="justify-center pt-4" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';

import type { ArticleType, ArticleItemType } from '@/type/article.type';

import { View, Pointer, ChatLineSquare, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

interface ArticleItemProps {
	data: ArticleType<ArticleItemType>;
	sliceData: ArticleItemType[];
	lineClamp?: number | string;
}
const { data, sliceData, lineClamp = 2 } = defineProps<ArticleItemProps>();

const limit = defineModel<number>('limit', { default: 5 });
const page = defineModel<number>('page', { default: 1 });

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

// 发布点击事件
const handlePublishClick = (id: number | string) => {
	console.log('发布点击事件:', id);
};

// 撤回点击事件
const handleRevokeClick = (id: number | string) => {
	console.log('撤回点击事件:', id);
};

// 编辑点击事件
const handleEditClick = (id: number | string) => {
	console.log('编辑点击事件:', id);
};

const currentId = ref<number | string | null>(null);
// 确定删除
const removeArticle = (id: number | string) => {
	console.log('删除点击事件:', id);
	currentId.value = null;
	ElMessage({
		message: '删除成功',
		type: 'success',
	});
};

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
