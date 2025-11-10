<template>
	<!-- 上传 -->
	<el-upload
		:action="actionUrl"
		multiple
		:on-preview="handlePreview"
		:on-remove="handleRemove"
		:before-remove="beforeRemove"
		:limit="3"
		:show-file-list="false"
		:on-exceed="handleExceed">
		<el-button type="primary" class="!mb-0">上传</el-button>
	</el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from 'element-plus';

const actionUrl = ref('');

// 点击已上传文件时触发
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
	console.log(uploadFile);
};

// 删除文件时触发
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
	console.log(file, uploadFiles);
};

// 删除文件之前的钩子
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
		() => true,
		() => false,
	);
};

// 超出上传最大数时触发
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
	ElMessage.warning(
		`The limit is 3, you selected ${files.length} files this time, add up to ${
			files.length + uploadFiles.length
		} totally`,
	);
};
</script>

<style lang="scss" scoped></style>
