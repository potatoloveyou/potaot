<template>
	<!-- 分组组件 -->
	<WhiteContainer class="grid grid-cols-[1fr_auto] mb-4 pb-0">
		<GroupingTag :stateData :groupingData v-model:selectTagId="selectTagId" />
		<div class="flex items-center pb-4">
			<el-popover width="220" title="请输入分组名称" content="Bottom Right prompts info" placement="bottom-end">
				<template #reference>
					<div class="flex items-center cursor-pointer text-[#2B5AED]">
						<el-icon class="mr-1" color="#2B5AED"><CirclePlus /></el-icon>
						新建
					</div>
				</template>
				<template #default>
					<div class="grid">
						<el-input v-model="newGroupingName" placeholder="请输入" class="mb-3 bg-[#f4f4f4]"></el-input>
						<div class="flex justify-end">
							<el-button type="info" plain size="small" @click="resetInput">取消</el-button>
							<el-button type="primary" size="small" @click="changeInput">确定</el-button>
						</div>
					</div>
				</template>
			</el-popover>
			<div class="flex items-center ml-6 cursor-pointer text-[#2B5AED]" @click="changeManage">
				<el-icon class="mr-1" color="#2B5AED"><Tools /></el-icon>
				管理分组
			</div>
			<!-- v-model:visible="visible" 具名v-model -->
			<ModalTableDialog
				v-model="visible"
				title="文章分类管理"
				tableHeight="24rem"
				:rows="editableRows"
				:columns
				@saveRow="saveRow" />
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

import type { StateRow, StateType, GroupingType } from '@/type/grouping.type';

import { CirclePlus, Tools } from '@element-plus/icons-vue';
import type { Column } from 'element-plus';
import { ElInput, ElButton } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';
import GroupingTag from '@/components/Grouping/GroupingTag.vue';
import ModalTableDialog from '@/components/ModalTableDialog.vue';

const selectTagId = defineModel<number | string>('selectTagId');

interface GroupingProps {
	stateData?: StateType[];
	groupingData: GroupingType;
}
const { stateData, groupingData } = defineProps<GroupingProps>();

const newGroupingName = ref('');
// 取消插入
const resetInput = () => {
	newGroupingName.value = '';
};

// 确定插入
const changeInput = () => {
	console.log('new grouping name:', newGroupingName.value);
};

const rows = computed<StateRow[]>(() => {
	return groupingData.list;
});

const visible = ref(false);
// 打开分组弹窗
const changeManage = () => {
	visible.value = true;
};

const columns = ref<Column<StateRow>[]>([
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
				'onUpdate:modelValue': (val: string) => ((rowData.name = val), onEditName(rowData)),
				size: 'default',
				style: { width: '15rem' },
				onKeydown: (e: KeyboardEvent) => {
					if (e.key === 'Enter') {
						saveRow(rowData);
					}
				},
			});
		},
	},
	{
		key: 'value',
		dataKey: 'value',
		title: '关联文章数',
		width: 125,
		align: 'left',
	},
	{
		key: 'createTime',
		dataKey: 'createTime',
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

const nameSet = computed(() => new Set(rows.value.map((r) => r.name.trim())));
// 校验名称
const validateName = (rowData: StateRow) => {
	const name = rowData.name.trim();
	if (!name) {
		ElMessage.error('名称不能为空');
		return false;
	}

	// 如果当前名字和原始名字不同且已经存在于 nameSet
	const originalName = originalNameMap.get(rowData.id) ?? '';
	if (name !== originalName && nameSet.value.has(name)) {
		ElMessage.error('名称已存在，请输入其他名称');
		return false;
	}

	return true;
};

// 模拟保存（未来换成接口）
const saveRow = (payload: StateRow | StateRow[]) => {
	const rowsToValidate = Array.isArray(payload) ? payload : [payload];

	// 执行校验（任意一个不通过都 return）
	for (const row of rowsToValidate) {
		if (!validateName(row)) return;
	}

	// // 此处未来可替换为 axios 请求
	// // ElMessage.success('保存成功');
	const changedRows = editableRows.value.filter((r) => r._dirty).map((r) => ({ id: r.id, name: r.name }));
	console.log('需要提交的数据：', changedRows);
};

// 输入修改
const onEditName = (rowData: StateRow) => {
	const originalName = originalNameMap.get(rowData.id) ?? '';
	rowData._dirty = rowData.name !== originalName;
};

// 删除
const removeRow = (id: string) => {
	console.log('我是被删除的id', id);
};

// **可编辑副本**
const editableRows = ref<StateRow[]>([]);
const originalNameMap = new Map<string | number, string>();
watch(
	rows,
	(newRows) => {
		editableRows.value = newRows.map((row) => {
			// 先记录原始名字
			originalNameMap.set(row.id, row.name);
			// 判断是否为未分组
			const isExclude = row.id === 'exclude'; // 根据你的逻辑判断“未分组”的条件
			return { ...row, _dirty: false, isExclude };
		});
	},
	{ immediate: true },
);
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
