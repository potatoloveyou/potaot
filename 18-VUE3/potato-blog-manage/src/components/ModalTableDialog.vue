<template>
	<!-- 管理分组弹窗 -->
	<el-dialog
		v-model="dialogVisible"
		:title
		:width="dialogWidth"
		header-class="d-header"
		footer-class="d-footer"
		class="dialog-wrapper grid">
		<template #default>
			<AutoResizerTable :height="tableHeight" :columns="columns" :data="rows" />
		</template>
		<template #footer>
			<el-button type="success" v-if="changedRows.length > 0" @click="resetRow">取消</el-button>
			<el-button type="primary" class="button" @click="saveRow">确认</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { StateRow } from '@/type/index';

import type { Column } from 'element-plus';

import AutoResizerTable from '@/components/ModalTableDialog/AutoResizerTable.vue';

const dialogVisible = defineModel<boolean>('visible');

const emit = defineEmits<{
	saveRow: [changedRows: StateRow[]];
}>();

interface ModalTableDialogProps {
	title: string;
	tableHeight: string;
	rows: any[];
	columns: Column[];
}

const { title, tableHeight, rows = [], columns = [] } = defineProps<ModalTableDialogProps>();

// 根据列宽度计算弹窗宽度
const dialogWidth = computed(() => {
	if (columns.length === 0) {
		return '50rem';
	}
	const totalWidth = columns.reduce((acc, cur) => acc + (cur.width || 0), 0);
	return `${totalWidth + 32}px`;
});

const changedRows = computed<StateRow[]>(() => {
	return rows.filter((r) => r._dirty);
});

const saveRow = () => {
	dialogVisible.value = false;
	if (!changedRows.value.length) return;

	emit('saveRow', changedRows.value);
	console.log(changedRows.value);
};

const resetRow = () => {
	console.log('取消');

	// changedRows.value.forEach((row) => {
	// 	row._dirty = false;
	// });
};

onMounted(() => {});
</script>

<style lang="scss">
.dialog-wrapper {
	.d-header {
		height: 3rem;
	}
	.d-footer {
		height: 3rem;
	}
}
</style>
