<template>
	<WhiteContainer>
		<!-- 文件列表组件 -->
		<div class="bg-[#f4f4f4] py-2 px-4 mb-4 grid grid-cols-[1fr_auto] items-center">
			<div class="[&>*]:mr-4 flex items-center">
				<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
					全选
				</el-checkbox>
				<span>已选择 {{ checkedCities.length }} 项内容</span>
				<el-button type="text" v-if="checkedCities.length > 0" @click="CheckNoAll">取消选择</el-button>
			</div>
			<div class="flex items-center">
				<el-button
					:icon="Delete"
					text
					:disabled="checkedCities.length === 0"
					@click="handleDeleteClick"
					class="p-2 ml-0 text-xl" />
				<el-button
					:icon="Switch"
					text
					:disabled="checkedCities.length === 0"
					ref="switchRef"
					v-click-outside="onClickOutside"
					class="p-2 ml-0 text-xl" />
			</div>
		</div>
		<el-checkbox-group
			v-model="checkedCities"
			@change="handleCheckedCitiesChange"
			class="grid grid-cols-5 gap-4 place-items-center">
			<div v-for="item in data.list" :key="item.id" class="grid w-68 h-68 group relative">
				<el-checkbox :value="item.id" :border="checkedCities.includes(item.id)" class="img-box p-0 h-58 rounded-md">
					<el-image fit="scale-down" :src="item.url" class="h-full" />
				</el-checkbox>
				<el-button
					:icon="ZoomIn"
					circle
					color="#2b5aed"
					@click.stop="handlePreviewClick(item.url)"
					class="absolute top-2 right-2 p-5 m-0 opacity-0 group-hover:opacity-100 text-2xl transition-all duration-300" />
				<div class="w-68 flex justify-center items-center">
					<el-text truncated line-clamp="1" class="text-base text-center">{{ item.fileName }}</el-text>
					<el-text class="text-base text-center">.{{ item.format }}</el-text>
				</div>
			</div>
		</el-checkbox-group>
		<el-image-viewer v-if="showPreview" :url-list="previewList" @close="showPreview = false" />
		<el-popover
			width="220"
			title="请选择分组"
			placement="bottom-end"
			ref="popoverRef"
			:virtual-ref="switchRef"
			trigger="click"
			virtual-triggering>
			<template #default>
				<div class="grid">
					<el-scrollbar noresize class="h-50">
						<el-button
							type="info"
							plain
							round
							size="default"
							@click="handleGroupingClick(item.id)"
							v-for="item in groupingData.list"
							class="w-full ml-0 mb-2 justify-start hover:bg-[#409eff] hover:border-[#409eff]">
							{{ item.name }} {{ item.value }}
						</el-button>
					</el-scrollbar>
					<div class="flex justify-end">
						<el-button type="info" plain size="small" @click="resetInput">取消</el-button>
						<el-button type="primary" size="small" @click="changeInput">确定</el-button>
					</div>
				</div>
			</template></el-popover
		>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="data.count"
			v-model:page-size="limit"
			v-model:current-page="page"
			class="justify-end pt-4" />
	</WhiteContainer>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import type { GroupingType } from '@/type/grouping.type';
import type { FileType, FileItemType } from '@/type/files.type';

import { Delete, Switch, ZoomIn } from '@element-plus/icons-vue';
import type { PopoverInstance } from 'element-plus';
import { ClickOutside as vClickOutside } from 'element-plus';

import WhiteContainer from '@/components/WhiteContainer.vue';

interface FilesProps {
	groupingData: GroupingType;
	data: FileType<FileItemType>;
}
const { groupingData, data } = defineProps<FilesProps>();

const limit = defineModel<number>('limit', { default: 10 });
const page = defineModel<number>('page', { default: 1 });

// 全选
const checkAll = ref(false);
// 半选
const isIndeterminate = ref(false);

// 选中的文件 id 列表
const checkedCities = ref([]);

// 全选
const handleCheckAllChange = (value: boolean) => {
	checkedCities.value = value ? data.list.map((item) => item.id) : [];
	isIndeterminate.value = false;
	// console.log(checkedCities.value);
};

//  取消全选按钮
const CheckNoAll = () => {
	checkAll.value = false;
	isIndeterminate.value = false;
	checkedCities.value = [];
};

// 单项选中
const handleCheckedCitiesChange = (value: number[]) => {
	// 选中数
	const checkedCount = value.length;
	// 选中数是否等于文件总数
	checkAll.value = checkedCount === data.count;
	// 选中数是否大于0 且 小于文件总数
	isIndeterminate.value = checkedCount > 0 && checkedCount < data.count;
};

const showPreview = ref(false);
const previewList = ref<string[]>([]);
// 点击预览
const handlePreviewClick = (url: string) => {
	showPreview.value = true;
	previewList.value = [url];
};

// 删除
const handleDeleteClick = () => {
	console.log(checkedCities.value);
};

//
const switchRef = useTemplateRef('switchRef');
const popoverRef = useTemplateRef<PopoverInstance>('popoverRef');
const onClickOutside = () => {
	popoverRef.value?.hide();
};

// 分组点击
const handleGroupingClick = (id: string | number) => {
	console.log('selected tag id:', id);
	console.log(checkedCities.value);
};

// 取消插入
const resetInput = () => {
	console.log('取消插入');
};

// 确定插入
const changeInput = () => {
	console.log('确定插入');
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.el-checkbox.img-box {
	position: relative;
	border: 1px solid white;
	transition: all 0.3s ease-in-out;
	&.is-bordered.is-checked {
		border: 1px solid #409eff;
		background-color: #2b5bed17;
		:deep(.el-checkbox__input) {
			opacity: 1;
		}
	}
	:deep(.el-checkbox__input) {
		position: absolute;
		top: 5%;
		left: 5%;
		opacity: 0;
		.el-checkbox__inner {
			width: 1.5rem;
			height: 1.5rem;
			&::after {
				width: 0.4rem;
				height: 0.75rem;
				top: 45%;
			}
		}
	}
	&:hover {
		background-color: rgba(0, 0, 0, 0.06);
		:deep(.el-checkbox__input) {
			opacity: 1;
		}
	}
	:deep(.el-checkbox__label) {
		padding: 0;
		width: 100%;
		height: 100%;
		display: grid;
	}
}
</style>
