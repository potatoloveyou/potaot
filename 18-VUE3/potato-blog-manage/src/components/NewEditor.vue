<template>
	<!-- 新建编辑器 -->
	<WhiteContainer class="min-w-0">
		<el-input v-model.trim="articleTitle" placeholder="请输入标题" class="text-2xl h-8 group mb-2">
			<template #suffix>
				<el-icon
					@click="resetNoteTitle"
					class="text-xl cursor-pointer opacity-0"
					:class="{ 'group-hover:opacity-100': articleTitle.length > 0 }"
					><CircleClose
				/></el-icon>
			</template>
		</el-input>

		<div class="w-full flex items-center mb-2">
			<el-select v-model="selectValue" placeholder="请选择标签" clearable class="w-28 mr-4">
				<el-option v-for="group in groupingData.list" :key="group.id" :label="group.name" :value="group.id" />
			</el-select>
			<el-scrollbar class="pr-4">
				<div class="flex gap-2 whitespace-nowrap items-center">
					<el-tag
						round
						closable
						color="#2b5aed"
						v-for="item in labels"
						@close="removeTag(item)"
						class="text-white shrink-0"
						>{{ item.name }}</el-tag
					>
				</div>
			</el-scrollbar>
			<el-popover width="380" title="标签" placement="bottom-end" trigger="click">
				<template #reference>
					<el-button text class="p-0" size="small" :disabled="labels.length >= 3">插入标签(最多3个)</el-button>
				</template>
				<template #default>
					<el-input
						v-model="tagInput"
						placeholder="请输入新标签"
						@keydown.enter="keydownTagInput"
						class="w-80 mb-4"></el-input>
					<el-scrollbar view-class="el-scrollbar-view" class="w-full flex-1 pr-2">
						<div class="grid grid-cols-5 gap-3">
							<el-button
								:type="item.isSelected ? 'primary' : 'info'"
								:plain="!item.isSelected"
								round
								:color="item.isSelected ? '#2b5aed' : ''"
								size="small"
								@click="changeTag(item)"
								v-for="item in labelData"
								:key="item.id"
								class="m-0 hover:bg-[#6b8cf2]">
								{{ item.name }} {{ item.value }}
							</el-button>
						</div>
					</el-scrollbar>
				</template>
			</el-popover>
		</div>

		<MdEditor v-model="articleContent" :preview="false" :toolbars="[]" placeholder="请输入内容" class="h-104" />
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import { label } from '@/mock/mock';
import type { LabelType, LabelRow } from '@/type/label.type';

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { onBeforeRouteLeave } from 'vue-router';

import type { GroupingType } from '@/type/grouping.type';

import { CircleClose } from '@element-plus/icons-vue';

import WhiteContainer from '@/components/WhiteContainer.vue';

import { storeToRefs } from 'pinia';
import { useNewPhotoGalleryStore } from '@/stores/newPhotoGalleryStore';
const newPhotoGalleryStore = useNewPhotoGalleryStore();
const { articleTitle, articleContent } = storeToRefs(newPhotoGalleryStore);
const { confirmLeave } = newPhotoGalleryStore;

interface GroupingProps {
	groupingData: GroupingType;
}

const { groupingData } = defineProps<GroupingProps>();

// 重置标题
const resetNoteTitle = () => {
	articleTitle.value = '';
};

// 下拉选择器选择内容
const selectValue = ref('');

const tagInput = ref('');
const keydownTagInput = () => {
	console.log(tagInput.value);
};

// 标签选中id数组
const labels = ref<LabelRow[]>([]);
const changeTag = (item: LabelRow) => {
	item.isSelected = !item.isSelected;
	if (item.isSelected) {
		// 最多3个
		if (labels.value.length >= 3) {
			item.isSelected = false;
			return;
		}

		// 避免重复
		if (!labels.value.find((l) => l.id === item.id)) {
			labels.value.push(item);
		}
	} else {
		// 取消选中时移除
		labels.value = labels.value.filter((l) => l.id !== item.id);
	}
};

// 删除标签
const removeTag = (item: LabelRow) => {
	labels.value = labels.value.filter((l) => l.id !== item.id);
	const target = labelData.value.find((l) => l.id === item.id);
	if (target) target.isSelected = false;
};

const labelData = ref<LabelRow[]>([]);
const getLabel = async () => {
	const res = await label.data;
	labelData.value = res.list.map(
		(item: LabelType): LabelRow => ({
			...item,
			isSelected: false,
		}),
	);
};

// 路由离开前确认保存
onBeforeRouteLeave(async (to, from) => {
	return await confirmLeave();
});

onMounted(() => {
	getLabel();
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
:deep(.el-select) {
	.el-select__wrapper {
		padding: 0;
		box-shadow: none;
	}
}
:deep(.el-tag) {
	.el-icon {
		color: white;
	}
}
:deep(.el-scrollbar) {
	.el-scrollbar__wrap {
		display: flex;
		align-items: center;
		.el-scrollbar__view {
			padding-bottom: 0.3rem;
		}
	}
}
</style>
