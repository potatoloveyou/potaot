<template>
	<WhiteContainer class="px-3 py-3 min-w-0 overflow-hidden">
		<el-input v-model.trim="noteTitle" placeholder="请输入标题" class="text-2xl h-8 group mb-2">
			<template #suffix>
				<el-icon
					@click="resetNoteTitle"
					class="text-xl cursor-pointer opacity-0"
					:class="{ 'group-hover:opacity-100': noteTitle.length > 0 }"
					><CircleClose
				/></el-icon>
			</template>
		</el-input>
		<MdEditor v-model="noteContent" :preview="false" :toolbars="[]" placeholder="请输入内容" class="h-104" />

		<el-upload action="#" multiple list-type="picture-card" :auto-upload="false" class="flex-1">
			<template #file="{ file }">
				<div class="w-24 h-24">
					<el-image fit="scale-down" lazy :src="file.url" />
					<span class="el-upload-list__item-actions justify-evenly [&>i]:cursor-pointer">
						<el-icon @click="handlePreviewClick(file)"><zoom-in /></el-icon>
						<el-icon @click="handleDownload(file)"><Download /></el-icon>
						<el-icon @click="handleRemove(file)"><Delete /></el-icon>
					</span>
				</div>
			</template>
			<el-icon><Plus /></el-icon>
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
import type { UploadFile, Action } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

import { onBeforeRouteLeave } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useHandwrittenNotesStore } from '@/stores/handwrittenNotesStore';
const handwrittenNotesStore = useHandwrittenNotesStore();
const { noteTitle, noteContent, isSaved } = storeToRefs(handwrittenNotesStore);

// 重置标题
const resetNoteTitle = () => {
	noteTitle.value = '';
};

const handleRemove = (file: UploadFile) => {
	console.log(file);
};

const showPreview = ref(false);
const previewList = ref<string[]>([]);
// 点击预览
const handlePreviewClick = (file: UploadFile) => {
	previewList.value = [file.url!];
	showPreview.value = true;
};

const handleDownload = (file: UploadFile) => {
	console.log(file);
};

// 取消
const reset = () => {
	noteTitle.value = '';
	noteContent.value = '';
	isSaved.value = false;
};

// 新建笔记
const createNote = () => {
	if (!noteTitle.value || !noteContent.value) {
		ElMessage.warning('请输入标题或内容');
		return;
	}
};

// 路由离开前确认保存
onBeforeRouteLeave((to, from, next) => {
	// 已保存过，直接放行

	if (isSaved.value) {
		next();
	}

	// 没有任何内容，直接放行
	if (!noteTitle.value && !noteContent.value) {
		next();
	}

	// 有内容，未保存，弹窗确认
	if ((noteTitle.value || noteContent.value) && !isSaved.value) {
		// 有内容，弹窗确认
		ElMessageBox.confirm('笔记尚未提交，是否保存？', '即将离开', {
			confirmButtonText: '确定保存',
			cancelButtonText: '不保存',
			type: 'warning',
			closeOnClickModal: false,
			closeOnPressEscape: false,
			distinguishCancelAndClose: true,
		})
			.then(() => {
				isSaved.value = true;
				ElMessage.success('笔记已保存');
				// 确认保存
				next();
			})
			.catch((action: Action) => {
				// cancel:取消按钮		close:关闭按钮
				if (action === 'cancel') {
					reset();
					next();
				} else if (action === 'close') {
					next(false);
				}
			});
	}
});
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
	border: 0;
	.cm-content {
		padding: 0;
		margin: 0 !important;
		.cm-line {
			padding: 0 0 0 1px;
		}
	}
	.md-editor-footer {
		border: 0;
	}
}
:deep(.el-upload-list--picture-card) {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	padding-bottom: 0.3rem;

	&::-webkit-scrollbar {
		height: 0.5rem; /* 滚动条厚度 */
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.1); /* 滑块颜色 */
		border-radius: 0.2rem;
		cursor: pointer;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}
	&::-webkit-scrollbar-track {
		background-color: transparent; /* 滚动条轨道 */
	}

	.el-upload-list__item {
		flex-shrink: 0;
		width: 6rem;
		height: 6rem;
		margin: 0;
		margin-right: 0.5rem;
	}

	// 图片选择卡
	.el-upload--picture-card {
		flex-shrink: 0;
		width: 6rem;
		height: 6rem;
	}
}
</style>
