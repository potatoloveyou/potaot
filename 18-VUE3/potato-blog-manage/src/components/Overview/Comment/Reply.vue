<template>
	<div class="py-4 border-b border-[#00000030] group">
		<div class="grid grid-cols-[auto_1fr] pb-3">
			<el-avatar shape="circle" size="default" :src="data?.user.avatar" v-if="isShow" class="mr-3" />
			<div class="grid gap-y-2 items-center relative">
				<el-text size="large" tag="b">{{ data?.user.username }}</el-text>
				<el-text size="small" type="info">{{ data?.createTime }}</el-text>
				<el-text :line-clamp="lineClamp" class="leading-6">{{ data?.content }}</el-text>
				<el-icon class="absolute top-0 right-5 cursor-pointer opacity-0 group-hover:opacity-100" @click="changeDel(data.id)"
					><Delete
				/></el-icon>
			</div>
		</div>
		<div v-if="isShow" class="flex items-center pl-16">
			<el-tag type="primary" class="mr-2">惬意时光</el-tag>
			<el-text type="danger" size="small">举报 {{ data?.report }}</el-text>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import { Delete } from '@element-plus/icons-vue';

import type { CommentItemType } from '@/type/index';

interface ReplyProps {
	data: CommentItemType;
	isShow?: boolean;
	lineClamp?: number | string;
}

const { data, isShow = true, lineClamp = 1 } = defineProps<ReplyProps>();

const emit = defineEmits<{
	deleteReply: [id: number | string];
}>();

const changeDel = (id: number | string) => {
	ElMessageBox.confirm('确定删除该评论吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'error',
		icon: markRaw(Delete),
	})
		.then(() => {
			ElMessage.success('删除成功');
			emit('deleteReply', id);
		})
		.catch(() => {
			console.log('取消删除');
		});
};
</script>

<style lang="scss" scoped></style>
