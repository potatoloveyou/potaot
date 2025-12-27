<template>
	<WhiteContainer class="pr-0">
		<el-input v-model.trim="rubric" clearable placeholder="请输入标题" class="text-2xl mb-2" />
		<MdEditor v-model="content" :preview="false" :toolbars="[]" placeholder="请输入内容" />
		<div class="flex justify-end mt-4">
			<el-button type="primary" color="#1e202514" @click="reset" class="text-black">取消</el-button>
			<el-button type="primary" color="#2b5aed" @click="createNote">新建笔记</el-button>
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import WhiteContainer from '@/components/WhiteContainer.vue';

const rubric = ref<string>('');
const content = ref<string>('');

// 取消
const reset = () => {
	rubric.value = '';
	content.value = '';
};

// 新建笔记
const createNote = () => {
	if (!rubric.value && !content.value) {
		ElMessage.warning('请输入标题或内容');
		return;
	}
};
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
:deep(.md-editor) {
	height: 25rem;
	border: 0;
	.cm-content {
		padding: 0;
		margin: 0 !important;
		.cm-line {
			padding: 0;
		}
	}
	.md-editor-footer {
		border: 0;
	}
}
</style>
