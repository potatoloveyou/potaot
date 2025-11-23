<template>
	<el-auto-resizer :style="{ height }">
		<template #default="{ height, width }">
			<el-table-v2 :columns :data :width :height fixed />
		</template>
	</el-auto-resizer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Column } from 'element-plus';

interface AutoResizerTableProps {
	height: string;
	columns: Column[];
	data: any[];
}
const { height, columns = [], data = [] } = defineProps<AutoResizerTableProps>();
</script>

<style lang="scss" scoped>
::v-deep .table-header-bg {
	background-color: #f5f7fa;
	font-weight: bold;
}
</style>
