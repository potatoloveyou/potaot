<template>
	<div class="bg-white !p-4">
		<span class="!text-[1.3rem]">评论{{ commentData.total }}</span>
		<div v-if="commentData.list.length">
			<Reply v-for="item in sliceData" :data="item" :key="item.id" />
			<el-pagination
				background
				size="small"
				layout="prev, pager, next"
				:total="commentData.total"
				:page-size="5"
				@change="changePag"
				class="justify-center !pt-4" />
		</div>
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
const sliceData = ref([]);
const limit = ref(5);
const offset = ref(0);
const getComment = async () => {
	let res = await comment.data;
	commentData.value = res;
	sliceData.value = commentData.value.list.slice(offset.value, limit.value + offset.value);
};

const changePag = (value) => {
	offset.value = (value - 1) * limit.value;
	getComment();
};

onMounted(() => {
	getComment();
});
</script>

<style lang="scss" scoped></style>
