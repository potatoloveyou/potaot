<template>
	<!-- 标题组件 -->
	<el-row justify="space-between" class="items-center">
		<el-col :span="8">
			<span class="!text-2xl">{{ props.name }}</span>
		</el-col>
		<el-col :span="10" v-if="isSearch" class="!flex justify-end">
			<slot name="custom" />
			<el-button
				type="info"
				plain
				color="#1e202514"
				v-show="input"
				@click="cancelSearch"
				class="!text-black !mr-2 transition"
				>取消搜索</el-button
			>
			<el-input
				v-model.trim="input"
				clearable
				:prefix-icon="Search"
				placeholder="请输入标题/简介"
				@keydown.enter="keydownInput"
				@clear="clearInput"
				class="!w-80 opacity-80 !text-xs" />
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { T } from 'node_modules/tailwindcss/dist/types-WlZgYgM8.d.mts';

type TopicProps = {
	/**
	 * 标题
	 */
	name?: string;
	isSearch: boolean;
};
// withDefaults 为defineProps定义默认值
const props = withDefaults(defineProps<TopicProps>(), {
	name: '总览',
	isSearch: true,
});

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
