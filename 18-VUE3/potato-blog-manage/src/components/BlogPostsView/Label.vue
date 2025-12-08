<template>
	<!-- 标签 -->
	<WhiteContainer class="w-full h-50">
		<div class="flex justify-between items-center">
			<span class="font-semibold">标签</span>
			<div class="flex items-center cursor-pointer text-[#2B5AED]" @click="changeManage">
				<el-icon class="mr-1" color="#2B5AED"><Tools /></el-icon>
				管理标签
			</div>

			<!-- <ModalTableDialog
				v-model:visible="visible"
				title="文章分类管理"
				tableHeight="24rem"
				:rows="editableRows"
				:columns="columns"
				@saveRow="saveRow" /> -->
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { label } from '@/mock/mock';

import type { LabelType } from '@/type/label.type';
import { Tools } from '@element-plus/icons-vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

const visible = ref(false);
// 打开分组弹窗
const changeManage = () => {
	// visible.value = true;
	console.log('打开标签弹窗');
};

const getLabel = async () => {
	let res = await label.data;
	console.log(res);
};

onMounted(() => {
	getLabel();
});
</script>

<style lang="scss" scoped></style>
