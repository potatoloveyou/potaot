<template>
	<!-- 总览右侧评论 -->
	<WhiteContainer>
		<span class="text-[1.3rem]">评论{{ commentData.total }}</span>
		<div v-if="commentData.list.length" class="h-full">
			<Reply v-for="item in sliceData" :data="item" :key="item.id" @deleteReply="deleteReply" />
			<el-pagination
				background
				size="small"
				layout="prev, pager, next"
				:total="commentData.total"
				:page-size="limit"
				@change="changePag"
				class="justify-center pt-4" />
		</div>
		<div v-else>暂无评论</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { comment } from '@/mock/mock';
import type { CommentResponseType, CommentItemType } from '@/type/index';

import WhiteContainer from '@/components/WhiteContainer.vue';
import Reply from '@/components/Overview/Comment/Reply.vue';

const commentData = ref<CommentResponseType<CommentItemType>>({
	total: 0,
	list: [],
});
const sliceData = ref<CommentItemType[]>();
const limit = ref(5);
const offset = ref(0);

// 获取评论
const getComment = async () => {
	let res = await comment.data;
	commentData.value = res;
	sliceData.value = commentData.value.list.slice(offset.value, limit.value + offset.value);
};

// 删除评论
const deleteReply = async (id: number | string) => {
	console.log('我是Comment', id);

	// getComment();
};

const changePag = (value: number) => {
	offset.value = (value - 1) * limit.value;
	getComment();
};

onMounted(() => {
	getComment();
});
</script>

<style lang="scss" scoped></style>
