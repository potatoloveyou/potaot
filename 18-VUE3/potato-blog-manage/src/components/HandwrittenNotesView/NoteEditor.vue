<template>
	<WhiteContainer class="px-3 py-3">
		<el-input v-model.trim="rubric" placeholder="请输入标题" class="text-2xl h-8 group mb-2">
			<template #suffix>
				<el-icon
					@click="resetRubric"
					class="text-xl cursor-pointer opacity-0"
					:class="{ 'group-hover:opacity-100': rubric.length > 0 }"
					><CircleClose
				/></el-icon>
			</template>
		</el-input>
		<MdEditor v-model="content" :preview="false" :toolbars="[]" placeholder="请输入内容" />

		<el-upload action="#" multiple list-type="picture-card" :auto-upload="false" class="my-2">
			<el-icon><Plus /></el-icon>
			<template #file="{ file }">
				<div class="w-24 h-24">
					<el-image fit="scale-down" :src="file.url" />
					<span class="el-upload-list__item-actions justify-evenly [&>i]:cursor-pointer">
						<el-icon @click="handlePreviewClick(file)"><zoom-in /></el-icon>
						<el-icon @click="handleDownload(file)"><Download /></el-icon>
						<el-icon @click="handleRemove(file)"><Delete /></el-icon>
					</span>
				</div>
			</template>
		</el-upload>

		<el-image-viewer v-if="showPreview" :url-list="previewList" @close="showPreview = false" />

		<div class="flex justify-end">
			<el-button type="primary" color="#1e202514" @click="reset" class="text-black">取消</el-button>
			<el-button type="primary" color="#2b5aed" @click="createNote">新建笔记</el-button>
		</div>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { CircleClose, Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

// 标题
const rubric = ref<string>('');
// 内容
const content = ref<string>('');

// 重置标题
const resetRubric = () => {
	rubric.value = '';
};

// 取消
const reset = () => {
	rubric.value = '';
	content.value = '';
};

const disabled = ref(false);

const handleRemove = (file: UploadFile) => {
	console.log(file);
};

const showPreview = ref(false);
const previewList = ref<string[]>([]);
// 点击预览
const handlePreviewClick = (file: UploadFile) => {
	console.log(file);
	previewList.value = [file.url!];
	showPreview.value = true;
};

const handleDownload = (file: UploadFile) => {
	console.log(file);
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
	height: 26rem;
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
:deep(.el-upload-list--picture-card) {
	flex-wrap: nowrap;
	.el-upload-list__item {
		width: 6rem;
		height: 6rem;
		margin: 0;
		margin-right: 0.5rem;
	}

	// 图片选择卡
	.el-upload--picture-card {
		width: 6rem;
		height: 6rem;
	}
}
</style>
