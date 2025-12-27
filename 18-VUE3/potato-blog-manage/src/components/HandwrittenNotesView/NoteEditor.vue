<template>
	<WhiteContainer>
		<el-input v-model.trim="rubric" clearable placeholder="请输入标题" size="large" class="text-2xl" />
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

const rubric = ref<string>('');
const content = ref<string>('');
</script>

<style lang="scss" scoped>
:deep(.el-input) {
	.el-input__wrapper {
		box-shadow: none;
		padding: 0;
		.el-input__inner {
			color: #1e2025 !important;
		}
	}
}
</style>
