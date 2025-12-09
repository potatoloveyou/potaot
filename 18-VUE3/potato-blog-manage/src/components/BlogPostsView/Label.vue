<template>
	<!-- 标签 -->
	<WhiteContainer class="w-full h-50 pr-2">
		<div class="flex justify-between items-center mb-4 pr-2">
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
		<el-scrollbar view-class="el-scrollbar-view" class="w-full flex-1 pr-2">
			<div class="grid grid-cols-4 gap-3">
				<el-button
					:type="isSelected(item.id) ? 'primary' : 'info'"
					:plain="!isSelected(item.id)"
					round
					:color="isSelected(item.id) ? '#2b5aed' : ''"
					size="small"
					@click="changeTag(item.id)"
					v-for="item in labelData"
					class="m-0 hover:bg-[#6b8cf2]">
					{{ item.name }} {{ item.value }}
				</el-button>
			</div>
		</el-scrollbar>
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

const labelData = ref<LabelType[]>([]);
const getLabel = async () => {
	let res = await label.data;
	labelData.value = res.list;
	console.log(labelData.value);
};

const selectTagId = ref<number | string>(0);
const changeTag = (id: number | string) => {
	selectTagId.value = id;
};

// 判断是否选中（返回 boolean）
const isSelected = (id: number | string) => selectTagId.value === id;

onMounted(() => {
	getLabel();
});
</script>

<style lang="scss" scoped></style>
