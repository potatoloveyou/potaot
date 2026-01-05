<template>
	<el-row justify="space-between" class="items-center">
		<el-col :span="12" class="cursor-pointer">
			<div class="flex items-center" @click="goOverview">
				<el-image src="src/assets/images/yike.png" class="w-9 h-9 rounded-full mr-2" />
				<el-text size="large" class="font-bold text-xl header-theme">土豆博客后台</el-text>
			</div>
		</el-col>
		<el-col :span="12" class="flex justify-end items-center">
			<el-button :icon="Message" text @click="openDrawer" class="p-2 mr-4 text-2xl" />

			<el-avatar shape="circle" size="default" src="src/assets/images/xxmLogo.png" class="mr-4" />
			<div class="cursor-pointer">
				<el-icon :size="20" @click="themeStore.switchTheme" v-if="themeStore.themes == 'light'" class="mr-4">
					<Sunny />
				</el-icon>

				<el-icon :size="20" @click="themeStore.switchTheme" v-else class="mr-4">
					<Moon />
				</el-icon>
			</div>
			<el-button type="primary" color="#2b5aed">退出</el-button>
		</el-col>
	</el-row>
	<PrivateMessage v-if="drawer" v-model:drawer="drawer" />
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

import { Message, Sunny, Moon } from '@element-plus/icons-vue';

const PrivateMessage = defineAsyncComponent(() => import('@/components/PrivateMessage.vue'));

// 回到主页
const goOverview = () => {
	router.push('/');
};

const drawer = ref(false);
// 打开私信抽屉
const openDrawer = () => {
	drawer.value = true;
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
</style>
