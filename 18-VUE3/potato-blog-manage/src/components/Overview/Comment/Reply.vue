<template>
	<div class="!py-4 !border-b !border-[#00000030]">
		<div class="grid grid-cols-[auto_1fr] !pb-3">
			<el-avatar shape="circle" size="default" :src="replyData?.user.avatar" class="!mr-4" />
			<div class="grid gap-y-2 items-center relative">
				<el-text size="large" tag="b">{{ replyData?.user.username }}</el-text>
				<el-text size="small" type="info">{{ replyData?.createTime }}</el-text>
				<el-text truncated line-clamp="1">{{ replyData?.content }}</el-text>
				<el-icon class="!absolute !top-0 !right-0"><Delete /></el-icon>
			</div>
		</div>
		<div class="flex items-center !pl-16">
			<el-tag type="primary" class="!mr-2">惬意时光</el-tag>
			<el-text type="danger" size="small">举报 {{ replyData?.report }}</el-text>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';

interface ReplyProps {
	data: any;
}
const { data } = defineProps<ReplyProps>();

const replyData = ref();
onMounted(() => {
	replyData.value = data;
	// console.log(replyData.value);
});
</script>

<style lang="scss" scoped>
.a {
	border: 1px solid #00000014;
	float: right;
}
</style>
