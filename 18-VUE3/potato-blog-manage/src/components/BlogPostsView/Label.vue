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
					class="m-0 hover:bg-[#6b8cf2]">
					{{ item.name }} {{ item.value }}
				</el-button>
			</div>
		</el-scrollbar>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { label } from '@/mock/mock';

import type { LabelType, LabelRow } from '@/type/index';

import { Tools } from '@element-plus/icons-vue';
import type { Column } from 'element-plus';
import { ElInput, ElButton } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

// 标签选中id
const selectTagId = ref<number | string>(0);
const changeTag = (id: number | string) => {
	selectTagId.value = id;
};

// 判断是否选中（返回 boolean）
const isSelected = (id: number | string) => selectTagId.value === id;

const visible = ref(false);
// 打开分组弹窗
const changeManage = () => {
	visible.value = true;
};

const rows = ref<LabelType[]>([]);

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
const validateName = (rowData: LabelRow) => {
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
const saveRow = (payload: LabelRow | LabelRow[]) => {
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
const onEditName = (rowData: LabelRow) => {
	const originalName = originalNameMap.get(rowData.id) ?? '';
	rowData._dirty = rowData.name !== originalName;
};

// 删除
const removeRow = (id: string) => {
	console.log('我是被删除的id', id);
};

const labelData = ref<LabelType[]>([]);
// **可编辑副本**
const editableRows = ref([]);
const originalNameMap = new Map<string | number, string>();
const getLabel = async () => {
	let res = await label.data;
	labelData.value = res.list;
	rows.value = labelData.value.map((item) => ({
		...item,
		isExclude: false,
	}));
	editableRows.value = rows.value.map((row) => {
		originalNameMap.set(row.id, row.name);
		return { ...row, _dirty: false }; // 可以加上 _dirty 标记
	});
};

onMounted(() => {
	getLabel();
});
</script>

<style lang="scss" scoped></style>
