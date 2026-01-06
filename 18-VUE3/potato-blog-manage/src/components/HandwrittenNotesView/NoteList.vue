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
					<WhiteContainer>
						<div class="w-full flex flex-col justify-center [&>*]:w-full">
							<el-text class="text-xl font-semibold text-[#1E2025] mb-2">{{ item.title }}</el-text>
							<el-text size="small" type="info" class="mx-4 mb-4">{{ item.createTime }}</el-text>
							<el-text class="text-base">{{ item.introduce }}</el-text>
						</div>
						<div class="mt-4">
							<el-image v-for="value in item.picture" :src="value" lazy fit="scale-down" class="w-22 h-22 mr-4" />
						</div>
					</WhiteContainer>
				</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { DiaryType, DiaryItemType } from '@/type/diary.type';

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

const limit = defineModel<number>('limit', { default: 5 });
const page = defineModel<number>('page', { default: 1 });
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
