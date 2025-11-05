<template>
	<div class="bg-white !p-4">
		<span class="!text-[1.3rem]">评论{{ commentData.total }}</span>
		<Reply :data="commentData.list" v-if="commentData.list.length" />
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { comment } from '@/mock/mock';

import Reply from '@/components/Overview/Comment/Reply.vue';

interface CommentData<T = any> {
	total: number;
	list: T[];
}

const commentData = ref<CommentData>({
	total: 0,
	list: [],
});
const getComment = async () => {
	let res = await comment.data;
	commentData.value = res;
};

onMounted(() => {
	getComment();
});
</script>

<style lang="scss" scoped></style>
