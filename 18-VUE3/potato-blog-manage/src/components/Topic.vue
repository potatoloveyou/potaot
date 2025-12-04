<template>
	<!-- 标题组件 -->
	<div class="h-10 grid grid-cols-[1fr_auto] items-center">
		<span class="text-[1.5rem]">{{ name }}</span>
		<!-- 放置插槽自定义标题组件右侧内容 -->
		<slot name="custom" />
		<div v-if="isSearch" class="grid grid-cols-[auto_auto] items-center">
			<el-button
				type="info"
				plain
				color="#1e202514"
				v-show="input"
				@click="cancelSearch"
				class="text-black mr-2 transition"
				>取消搜索</el-button
			>
			<el-input
				v-model.trim="input"
				clearable
				:prefix-icon="Search"
				placeholder="请输入标题/简介"
				size="default"
				@keydown.enter="keydownInput"
				@clear="clearInput"
				class="w-80 opacity-80" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

interface TopicProps {
	/**
	 * 标题
	 */
	name?: string;
	isSearch: boolean;
}
const { name = '总览', isSearch = true } = defineProps<TopicProps>();

const input = ref<string>('');

const emit = defineEmits<{
	search: [value: string];
}>();
// 键盘回车时触发
const keydownInput = () => {
	emit('search', input.value);
};

// 输入框清空回调
const clearInput = () => {
	console.log('清空输入框');
};

// 取消搜索
const cancelSearch = () => {
	input.value = '';
	emit('search', input.value);
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.button-theme {
	@include useTheme {
		color: getVar('textColor');
	}
}
</style>
