<template>
	<el-row justify="space-between" class="items-center">
		<el-col :span="12" class="cursor-pointer">
			<div class="flex items-center" @click="goOverview">
				<el-image src="src/assets/images/yike.png" class="w-9 h-9 rounded-full !mr-2" />
				<el-text size="large" class="!font-bold !text-xl header-theme">土豆博客后台</el-text>
			</div>
		</el-col>
		<el-col :span="12" class="!flex justify-end items-center">
			<el-icon :size="20" class="!mr-4 cursor-pointer">
				<Message />
			</el-icon>
			<el-image src="src/assets/images/xxmLogo.png" class="w-8 h-8 rounded-full !mr-4" />
			<div class="cursor-pointer">
				<el-icon :size="20" @click="themeStore.switchTheme" v-if="themeStore.themes == 'light'" class="!mr-4">
					<Sunny />
				</el-icon>

				<el-icon :size="20" @click="themeStore.switchTheme" v-else class="!mr-4">
					<Moon />
				</el-icon>
			</div>
			<el-button type="primary">退出</el-button>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { Message, Sunny, Moon } from '@element-plus/icons-vue';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

const goOverview = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.header-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor');
	}
}
.a {
	background-color: red;
	// width: ;
}
</style>
