<template>
	<WhiteContainer>
		<el-upload
			v-model:file-list="fileList"
			action="#"
			drag
			multiple
			:auto-upload="false"
			:show-file-list="false"
			:on-change="handleChange"
			class="flex-1">
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="text-gray-500">单击或拖动文件到此区域进行上传</div>
		</el-upload>
		<el-scrollbar noresize class="h-98">
			<div ref="containerRef" class="relative w-full">
				<div
					v-for="(file, index) in fileList"
					:key="file.uid"
					ref="itemRefs"
					class="group absolute rounded-lg overflow-hidden border border-gray-200 bg-white">
					<el-image :src="file.url" fit="scale-down" class="w-full block" @load="layout" />

					<div
						class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-[#2b5aed] flex items-center justify-around rounded-md [&>*]:hover:cursor-pointer transition-all duration-300">
						<el-button color="#2b5aed" @click.stop="setCover(file.uid)" class="p-1">设为封面 </el-button>
						<!-- 删除 -->
						<el-button :icon="Delete" color="#2b5aed" @click.stop="removeImage(file.uid)" class="p-1 m-0"></el-button>
					</div>
					<el-icon color="#FFAA1A" class="absolute top-2 left-2 text-2xl" v-if="file.uid == coverUid"
						><StarFilled
					/></el-icon>
					<div class="absolute bottom-2 right-2 text-[#2b5aed] font-bold">{{ index + 1 }}</div>
				</div>
			</div>
		</el-scrollbar>
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UploadFilled, Delete, StarFilled } from '@element-plus/icons-vue';
import type { UploadFile, UploadFiles, UploadUserFile } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

const fileList = ref<UploadUserFile[]>([]);
const coverUid = ref<string | number>('');
const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	if (uploadFile.raw && !uploadFile.url) {
		uploadFile.url = URL.createObjectURL(uploadFile.raw);
	}
	if (!coverUid.value && uploadFiles.length) {
		coverUid.value = uploadFiles[0].uid;
	}

	nextTick(layout);
};

const containerRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const columnCount = 3;
const gap = 12;
const layout = () => {
	const container = containerRef.value;
	if (!container) return;

	const containerWidth = container.clientWidth;
	const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;

	// 每一列自己的高度（关键）
	const columnHeights = Array(columnCount).fill(0);

	itemRefs.value.forEach((el, index) => {
		const col = index % columnCount;

		el.style.width = `${columnWidth}px`;
		el.style.left = `${col * (columnWidth + gap)}px`;
		el.style.top = `${columnHeights[col]}px`;

		// 更新这一列的高度
		columnHeights[col] += el.offsetHeight + gap;
	});

	// 容器高度取最高列
	container.style.height = `${Math.max(...columnHeights)}px`;
};

// 删除图片
const removeImage = (uid: string | number) => {
	const index = fileList.value.findIndex((f) => f.uid === uid);
	if (index === -1) return;

	fileList.value.splice(index, 1);

	// 如果删的是封面，重置封面
	if (coverUid.value === uid) {
		coverUid.value = fileList.value[0]?.uid ?? null;
	}

	nextTick(layout);
};

// 设置封面
const setCover = (uid: string | number) => {
	const index = fileList.value.findIndex((f) => f.uid === uid);
	if (index <= 0) return;

	const item = fileList.value.splice(index, 1)[0];
	fileList.value.unshift(item);

	coverUid.value = uid;
	nextTick(layout);
};

// 监听容器尺寸变化
onMounted(() => {
	const observer = new ResizeObserver(() => {
		layout();
	});
	if (containerRef.value) {
		observer.observe(containerRef.value);
	}
});
</script>

<style lang="scss">
.el-upload {
	.el-upload-dragger {
		padding-block: 1.5rem;
	}
}
</style>
