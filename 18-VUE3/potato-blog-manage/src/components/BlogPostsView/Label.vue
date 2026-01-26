<template>
	<!-- 标签 -->
	<WhiteContainer class="w-full h-50 pr-2">
		<div class="flex justify-between items-center mb-4 pr-2">
			<span class="font-semibold">标签</span>
			<div class="flex items-center cursor-pointer text-[#2B5AED]" @click="changeManage">
				<el-icon class="mr-1" color="#2B5AED"><Tools /></el-icon>
				管理标签
			</div>
			<ModalTableDialog
				v-model:visible="visible"
				title="标签管理"
				tableHeight="24rem"
				:rows="editableRows"
				:columns="columns"
				@saveRow="saveRow" />
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
					:key="item.id"
					class="m-0 hover:bg-[#6b8cf2]">
					{{ item.name }} {{ item.value }}
				</el-button>
			</div>
		</el-scrollbar>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue';
import { label } from '@/mock/mock';
import type { LabelType, LabelRow } from '@/type/label.type';

import { Tools } from '@element-plus/icons-vue';
import { ElInput, ElButton, ElMessage } from 'element-plus';
import type { Column } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';
import ModalTableDialog from '@/components/ModalTableDialog.vue';

/* ---------------- 标签选择区 ---------------- */
const selectedTagId = ref<number | string>(0);

const changeTag = (id: number | string) => {
	if (selectedTagId.value === id) {
		selectedTagId.value = 0;
		return;
	}
	selectedTagId.value = id;
};

// 判断是否选中
const isSelected = (id: number | string) => selectedTagId.value === id;

/* ---------------- 弹窗控制 ---------------- */
// 弹窗是否显示
const visible = ref(false);
const changeManage = () => (visible.value = true);

/* ---------------- 数据区 ---------------- */

// 页面上展示的标签
const labelData = ref<LabelType[]>([]);

// 弹窗里“可编辑副本”
interface EditableLabelRow extends LabelRow {
	isExclude?: boolean;
}
const editableRows = ref<EditableLabelRow[]>([]);

/* ---------------- 初始化数据 ---------------- */
const getLabel = async () => {
	const res = await label.data;
	labelData.value = res.list;

	// 生成“带编辑能力”的副本
	editableRows.value = labelData.value.map((item) => ({
		...item,
		originalName: item.name,
		_dirty: false,
		isExclude: false,
	}));
};

onMounted(() => {
	getLabel();
});

/* ---------------- 编辑状态管理 ---------------- */
const markDirty = (row: EditableLabelRow) => {
	row._dirty = row.name.trim() !== row.originalName?.trim();
};

/* ---------------- 名称校验 ---------------- */
const nameSet = computed(() => new Set(editableRows.value.map((r) => r.name.trim())));

const validateName = (row: EditableLabelRow) => {
	const name = row.name.trim();

	if (!name) {
		ElMessage.error('名称不能为空');
		return false;
	}

	if (name !== row.originalName && nameSet.value.has(name)) {
		ElMessage.error('名称已存在，请输入其他名称');
		return false;
	}

	return true;
};

/* ---------------- 保存逻辑 ---------------- */
const saveRow = (payload: LabelRow | LabelRow[]) => {
	const rowsToCheck = Array.isArray(payload) ? payload : [payload];

	for (const row of rowsToCheck) {
		if (!validateName(row as EditableLabelRow)) return;
	}

	const changedRows = editableRows.value.filter((r) => r._dirty).map((r) => ({ id: r.id, name: r.name }));

	console.log('需要提交的数据：', changedRows);

	// 模拟保存成功后，重置 originalName
	editableRows.value.forEach((row) => {
		if (row._dirty) {
			row.originalName = row.name;
			row._dirty = false;
		}
	});
};

/* ---------------- 删除 ---------------- */
const removeRow = (id: string | number) => {
	editableRows.value = editableRows.value.filter((r) => r.id !== id);
};

/* ---------------- 表格列定义 ---------------- */
const columns = ref<Column[]>([
	{
		key: 'number',
		dataKey: 'number',
		title: '序号',
		width: 60,
		align: 'left',
		cellRenderer: ({ rowIndex }) => rowIndex + 1,
	},
	{
		key: 'labelName',
		dataKey: 'labelName',
		title: '标签名',
		width: 250,
		align: 'left',
		cellRenderer: ({ rowData }) => {
			if (rowData.isExclude) return rowData.name;

			return h(ElInput, {
				modelValue: rowData.name,
				'onUpdate:modelValue': (val: string) => {
					rowData.name = val;
					markDirty(rowData);
				},
				size: 'default',
				style: { width: '15rem' },
				onKeydown: (e: KeyboardEvent) => {
					if (e.key === 'Enter') saveRow(rowData);
				},
			});
		},
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
		align: 'left',
		cellRenderer: ({ rowData }) => {
			if (rowData.isExclude) return '-';

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
</script>

<style lang="scss" scoped></style>
