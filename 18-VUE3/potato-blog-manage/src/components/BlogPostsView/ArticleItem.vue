<template>
	<!-- 文章列表 -->
	<DynamicScroller
		:items="data.list"
		key-field="id"
		:min-item-size="180"
		:buffer="300"
		@scroll-end="emit('loadMore')"
		class="h-full">
		<template #default="{ item }">
			<DynamicScrollerItem :item active>
				<div class="pb-3">
					<WhiteContainer class="w-full">
						<div class="h-full grid grid-cols-[auto_1fr]">
							<div class="w-46 mr-4 rounded-xl overflow-hidden relative">
								<el-image :src="item.cover" lazy fit="scale-down" class="h-full" />
								<div
									v-if="item.state"
									class="absolute bottom-0 w-full bg-[#2b5aedcc] text-white flex justify-center py-3">
									未发布
								</div>
							</div>
							<div class="flex flex-col [&>*]:w-full">
								<el-text class="text-xl font-semibold text-[#1E2025] mb-2">{{ item.title }}</el-text>
								<el-text :line-clamp="lineClamp" class="text-base">{{ item.introduce }}</el-text>
								<div class="flex items-center justify-between mt-auto">
									<div class="flex items-center">
										<el-text size="small" class="text-[#1e2025b8]">{{ item.label }} {{ item.region }}</el-text>
										<el-text size="small" type="info" class="mx-4">{{ item.createTime }}</el-text>

										<div
											v-for="icon in iconItems"
											:key="icon.value"
											class="flex items-center mr-3 [&>*]:text-[#909399]">
											<el-icon class="mr-1 text-sm" v-if="icon.icon.name != 'Pointer'">
												<component :is="icon.icon" />
											</el-icon>
											<span v-else class="iconfont icon-dianzan"></span>
											<el-text size="small">{{ item[icon.value] }}</el-text>
										</div>
									</div>

									<div
										class="flex items-center [&>*]:ml-5 [&>*]:cursor-pointer [&>*]:text-[#909399] [&>*:hover]:text-[#2B5AED] text-xl">
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
				</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';

import type { ArticleType, ArticleItemType } from '@/type/article.type';

import { View, Pointer, ChatLineSquare, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import WhiteContainer from '@/components/WhiteContainer.vue';

const emit = defineEmits<{
	loadMore: [];
}>();

interface ArticleItemProps {
	data: ArticleType<ArticleItemType>;

	lineClamp?: number | string;
}
const { data, lineClamp = 2 } = defineProps<ArticleItemProps>();

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
</script>

<style lang="scss" scoped>
.vue-recycle-scroller {
	padding-right: 0.5rem;
	// :deep(.vue-recycle-scroller__item-view) {
	// 	margin-bottom: 1rem !important;
	// 	background-color: red;
	// }
	&::-webkit-scrollbar {
		width: 0.5rem; /* 滚动条厚度 */
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.1); /* 滑块颜色 */
		border-radius: 0.2rem;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	&::-webkit-scrollbar-track {
		background-color: transparent; /* 滚动条轨道 */
	}
}
</style>
