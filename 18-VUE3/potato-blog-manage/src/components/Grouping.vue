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
			<ModalTableDialog
				v-model:visible="visible"
				title="文章分类管理"
				tableHeight="24rem"
				:rows="rows"
				:columns="columns" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

import { storeToRefs } from 'pinia';
import { useGroupingStore } from '@/stores/LocalFilesStores';
const { groupingData, exclude } = storeToRefs(useGroupingStore());

import { CirclePlus, Tools } from '@element-plus/icons-vue';
import type { Column } from 'element-plus';
import { ElInput, ElButton } from 'element-plus';

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
// 管理分组弹窗
const changeManage = () => {
	visible.value = true;
};

// 删除函数
const removeRow = (id: string) => {
	console.log('我是被删除的id', id);
};

const rows = computed(() => {
	const excludeRow = {
		id: 'exclude',
		name: '未分组',
		relatedCount: exclude.value.value,
		createdAt: '-',
		isExclude: true,
	};

	return [
		excludeRow,
		...groupingData.value.list.map((item) => ({
			id: item.id,
			name: item.name,
			relatedCount: item.value,
			createdAt: item.createTime,
			isExclude: false,
		})),
	];
});

const columns = ref<Column<any>[]>([
	{
		key: 'number',
		dataKey: 'number',
		title: '序号',
		width: 60,
		align: 'left',
		cellRenderer: ({ rowIndex }) => rowIndex + 1,
	},
	{
		key: 'name',
		dataKey: 'name',
		title: '名称',
		width: 250,
		align: 'left',
		cellRenderer: ({ rowData }) => {
			if (rowData.isExclude) return rowData.name;
			return h(ElInput, {
				modelValue: rowData.name,
				'onUpdate:modelValue': (val: string) => (rowData.name = val),
				size: 'default',
				style: { width: '15rem' },
			});
		},
	},
	{
		key: 'relatedCount',
		dataKey: 'relatedCount',
		title: '关联文章数',
		width: 125,
		align: 'left',
	},
	{
		key: 'createdAt',
		dataKey: 'createdAt',
		title: '创建日期',
		width: 180,
		align: 'left',
	},
	{
		key: 'operations',
		dataKey: 'operations',
		title: '操作',
		width: 60,
		// fixed: TableV2FixedDir.LEFT,
		align: 'left',
		cellRenderer: ({ rowData }) => {
			if (rowData.isExclude) return '-'; // 不允许删除
			return h(
				ElButton,
				{
					size: 'small',
					type: 'text',
					onClick: () => removeRow(rowData.id),
				},
				() => '删除',
			);
		},
	},
]);

onMounted(() => {});
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
