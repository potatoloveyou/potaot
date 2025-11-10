<template>
	<el-dialog v-model="dialogVisible" title="Tips" width="500">
		<span>This is a message</span>
		<template #footer> </template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialogVisible = defineModel<boolean>('visible');

// interface ManageGroupingProps {
// 	visible: boolean;
// }

// const { visible = false } = defineProps<ManageGroupingProps>();

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
