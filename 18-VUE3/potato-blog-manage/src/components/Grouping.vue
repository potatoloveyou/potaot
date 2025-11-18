<template>
	<!-- 分组组件 -->
	<div class="grid grid-cols-[1fr_auto] items-center bg-white !p-4 rounded-lg">
		<GroupingTag />
		<div class="flex items-center">
			<el-popover width="220" title="请输入分组名称" content="Bottom Right prompts info" placement="bottom-end">
				<template #reference>
					<div class="flex items-center cursor-pointer text-[#2B5AED]">
						<el-icon class="!mr-1" color="#2B5AED"><CirclePlus /></el-icon>
						新建
					</div>
				</template>
				<template #default>
					<div class="grid">
						<el-input v-model="newGroupingName" placeholder="请输入" class="!mb-3 !bg-[#f4f4f4]"></el-input>
						<div class="flex justify-end">
							<el-button type="info" plain size="small" @click="resetInput">取消</el-button>
							<el-button type="primary" size="small" @click="changeInput">确定</el-button>
						</div>
					</div>
				</template>
			</el-popover>

			<div class="flex items-center !ml-6 cursor-pointe text-[#2B5AED]" @click="changeManage">
				<el-icon class="!mr-1" color="#2B5AED"><Tools /></el-icon>
				管理分组
			</div>
			<ModalTableDialog v-model:visible="visible" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { CirclePlus, Tools } from '@element-plus/icons-vue';

import GroupingTag from '@/components/Grouping/GroupingTag.vue';
import ModalTableDialog from '@/components/ModalTableDialog.vue';

const newGroupingName = ref('');

// 取消插入
const resetInput = () => {
	newGroupingName.value = '';
};

// 确定插入
const changeInput = () => {
	console.log('new grouping name:', newGroupingName.value);
};

const visible = ref(false);
// 管理分组
const changeManage = () => {
	visible.value = true;
};

onMounted(() => {
	// console.log(stateData.value);
	// console.log(groupingData.value);
	// console.log(exclude.value);
});
</script>

<style lang="scss" scoped>
.el-radio-group {
	& > .el-radio-button {
		margin-right: 1rem;
	}
}

:deep(.el-scrollbar-view) {
	height: 100%;
}

.text-color {
	color: $gradient-1 !important;
	// background-image: $gradient-1 !important;
}
</style>
