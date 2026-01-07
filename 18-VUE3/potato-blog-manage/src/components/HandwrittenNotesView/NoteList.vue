<template>
	<DynamicScroller
		:items="data.list"
		key-field="id"
		:min-item-size="160"
		:buffer="300"
		@scroll-end="emit('loadMore')"
		class="h-[calc(100dvh-4rem-2.5rem-2rem-1rem)]">
		<template #default="{ item }">
			<DynamicScrollerItem :item active>
				<div class="pb-4">
					<WhiteContainer class="group">
						<div class="w-full flex flex-col justify-center [&>*]:w-full">
							<el-text class="text-xl font-semibold text-[#1E2025] mb-2">{{ item.title }}</el-text>
							<el-text size="small" type="info" class="mx-4 mb-4">{{ item.createTime }}</el-text>
							<el-text class="text-base">{{ item.introduce }}</el-text>
						</div>
						<div class="mt-4">
							<el-image
								v-for="value in item.picture.slice(0, 3)"
								:src="value"
								lazy
								fit="scale-down"
								@click="handlePreviewClick(item.picture)"
								class="w-22 h-22 mr-4" />
						</div>
						<el-icon
							class="absolute top-6 right-6 cursor-pointer opacity-0 group-hover:opacity-100"
							@click="changeDel(item.id)"
							><Delete
						/></el-icon>
					</WhiteContainer>
				</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
	<el-image-viewer v-if="showPreview" :url-list="previewList" @close="showPreview = false" show-progress />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DiaryType, DiaryItemType } from '@/type/diary.type';

import { Delete } from '@element-plus/icons-vue';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import WhiteContainer from '@/components/WhiteContainer.vue';

const emit = defineEmits<{
	loadMore: [];
}>();

interface NoteListProps {
	data: DiaryType<DiaryItemType>;
}
const { data } = defineProps<NoteListProps>();

const changeDel = (id: number | string) => {
	ElMessageBox.confirm('确定删除该评论吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'error',
		icon: markRaw(Delete),
	})
		.then(() => {
			// ElMessage.success('删除成功');
			console.log('删除成功', id);
		})
		.catch(() => {
			console.log('取消删除');
		});
};

const showPreview = ref(false);
const previewList = ref<string[]>([]);
// 点击预览
const handlePreviewClick = (urlList: string[]) => {
	showPreview.value = true;
	previewList.value = urlList;
};
</script>

<style lang="scss" scoped>
.vue-recycle-scroller {
	padding-right: 0.5rem;
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
