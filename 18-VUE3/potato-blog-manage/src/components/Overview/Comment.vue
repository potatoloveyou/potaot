<template>
	<!-- 总览右侧评论 -->
	<WhiteContainer class="min-h-0 flex flex-col pr-2">
		<span class="text-[1.3rem]">评论{{ data.total }}</span>
		<DynamicScroller
			:items="data.list"
			key-field="id"
			:min-item-size="100"
			:buffer="300"
			@scroll-end="emit('loadMore')"
			v-if="data.list.length">
			<template #default="{ item }">
				<DynamicScrollerItem :item active>
					<Reply :data="item" :lineClamp="3" isShow @deleteReply="deleteReply"
				/></DynamicScrollerItem>
			</template>
		</DynamicScroller>
		<div v-else>暂无评论</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { CommentType, CommentItemType } from '@/type/comment.type';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import WhiteContainer from '@/components/WhiteContainer.vue';
import Reply from '@/components/Overview/Comment/Reply.vue';

const emit = defineEmits<{
	loadMore: [];
}>();

interface CommentProps {
	data: CommentType<CommentItemType>;
}
const { data } = defineProps<CommentProps>();

// 删除评论
const deleteReply = async (id: number | string) => {
	console.log('我是Comment', id);
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
		cursor: pointer;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	&::-webkit-scrollbar-track {
		background-color: transparent; /* 滚动条轨道 */
	}
}
</style>
