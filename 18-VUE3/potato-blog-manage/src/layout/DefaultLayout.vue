<template>
	<div class="default-layout h-dvh">
		<el-container class="h-full">
			<el-header class="p-0">
				<el-button type="primary" @click="themeStore.switchTheme">切换主题</el-button>
			</el-header>
			<el-container>
				<el-aside class="p-0" width="200px">Aside</el-aside>
				<el-container>
					<el-main class="p-0">
						<RouterView />
					</el-main>
					<!-- <el-footer class="p-0">Footer</el-footer> -->
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<style lang="scss" scoped>
// .el-header {
// 	background-color: red;
// }
// .el-aside {
// 	background-color: blue;
// }
// .el-main {
// 	background-color: green;
// }
// .el-footer {
// 	background-color: yellow;
// }
</style>
