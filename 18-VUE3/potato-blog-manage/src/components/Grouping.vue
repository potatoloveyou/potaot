<template>
	<!-- 分组组件 -->
	<div class="grid grid-cols-[1fr_auto] items-center bg-white !p-4">
		<el-scrollbar view-class="el-scrollbar-view">
			<div class="h-full flex items-center">
				<el-tag :type="getTagType(0)" effect="light" round @click="changeTag(0)" class="!mr-2 cursor-pointer">
					全部 {{ groupingData.count }}
				</el-tag>
				<el-tag
					:type="getTagType(item.id)"
					effect="light"
					round
					@click="changeTag(item.id)"
					v-for="item in stateData"
					class="!mr-2 cursor-pointer">
					{{ item.name }} {{ item.value }}
				</el-tag>
				<el-tag
					:type="getTagType(exclude.id)"
					effect="light"
					round
					@click="changeTag(exclude.id)"
					class="!mr-2 cursor-pointer">
					{{ exclude.name }} {{ exclude.value }}
				</el-tag>
				<el-tag
					:type="getTagType(item.id)"
					effect="light"
					round
					@click="changeTag(item.id)"
					v-for="item in groupingData?.list"
					class="!mr-2 cursor-pointer">
					{{ item.name }} {{ item.value }}
				</el-tag>
			</div>
		</el-scrollbar>

		<!-- <div class="flex items-center cursor-pointer" v-click-outside="onClickOutside">
			<el-icon class="!mr-1"><CirclePlus /></el-icon>
			新建
		</div> -->
		<div class="flex items-center">
			<el-button v-popover="popoverRef" @click="onClickOutside"> Click me </el-button>
			<el-popover
				ref="popoverRef"
				trigger="click"
				virtual-triggering
				persistent
				width="220"
				title="请输入分组名称"
				content="Bottom Right prompts info"
				placement="bottom-end">
				<template #reference> </template>
				<template #default>
					<div class="grid">
						<el-input v-model="newGroupingName" placeholder="请输入" class="!mb-3 !bg-[#f4f4f4]"></el-input>
						<div class="flex justify-end">
							<el-button type="info" plain size="small" @click="resetInput">取消</el-button>
							<el-button type="primary" size="small" @click="changeInput">确定</el-button>
						</div>
					</div>
				</template>
			</el-popover>

			<div class="flex items-center">
				<el-icon class="!mr-1"><Tools /></el-icon>
				管理分组
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';
import { CirclePlus, Tools } from '@element-plus/icons-vue';

import { storeToRefs } from 'pinia';
import { useGroupingStore } from '@/stores/grouping';
const { stateData, groupingData, exclude } = storeToRefs(useGroupingStore());

type TagType = 'info' | 'primary' | 'success' | 'warning' | 'danger';
const tagType = ref<TagType>('info');

const selectTagId = ref<number | string>(0);
const changeTag = (id: number | string) => {
	selectTagId.value = id;
	console.log('selected tag id:', selectTagId.value);
};
// 判断是否选中（返回 boolean）
const isSelected = (id: number | string) => selectTagId.value === id;

// 根据 id 返回要绑定到 el-tag 的 type
const getTagType = (id: number | string): TagType => {
	return isSelected(id) ? 'primary' : 'info';
};

const popoverRef = useTemplateRef('popoverRef');
const onClickOutside = () => {
	popoverRef.value?.hide();
};

const newGroupingName = ref<string>('');

// 取消输入
const resetInput = () => {
	newGroupingName.value = '';
	popoverRef.value?.hide();
};

// 确定输入
const changeInput = () => {
	console.log('new grouping name:', newGroupingName.value);
	popoverRef.value?.hide();
};

onMounted(() => {
	// console.log(stateData.value);
	// console.log(groupingData.value);
	// console.log(exclude.value);
});
</script>

<style lang="scss" scoped>
.el-radio-group {
	& > .el-radio-button {
		margin-right: 1rem;
	}
}

:deep(.el-scrollbar-view) {
	height: 100%;
}

</style>
