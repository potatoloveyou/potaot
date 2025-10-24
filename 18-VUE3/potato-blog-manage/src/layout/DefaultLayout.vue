<template>
	<div class="default-layout h-dvh">
		<el-container class="h-full">
			<el-header
				height="4rem"
				class="w-full fixed top-0 left-0 z-10 bg-white !grid items-center default-layout-header-theme">
				<AppHeader />
			</el-header>

			<el-container class="header-height">
				<el-aside class="p-0 !m-2" width="192px">
					<AppAside />
				</el-aside>
				<el-main class="p-0">
					<RouterView />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AppHeader from '@/layout/layout-components/AppHeader.vue';
import AppAside from '@/layout/layout-components/AppAside.vue';

import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.default-layout-header-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor');
		background-color: getVar('specialColor');
		border-bottom: 1px solid getVar('borderColor');
	}
}
</style>
