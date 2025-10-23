<template>
	<el-row justify="space-between" class="items-center">
		<el-col :span="12" class="">
			<div class="!flex items-center cursor-pointer">
				<el-image src="src/assets/images/yike.png" class="w-8 h-8 rounded-full !mr-2" />
				<el-text size="large" class="!font-bold !text-xl switch-theme">土豆博客后台</el-text>
			</div>
		</el-col>
		<el-col :span="12" class="!flex justify-end items-center">
			<el-icon :size="20" class="!mr-4 switch-theme cursor-pointer"><i-ep-Message /></el-icon>
			<el-image src="src/assets/images/xxmLogo.png" class="w-8 h-8 rounded-full !mr-4" />
			<div class="cursor-pointer">
				<el-icon
					:size="20"
					@click="themeStore.switchTheme"
					v-if="themeStore.themes == 'light'"
					class="!mr-4 switch-theme">
					<i-ep-Sunny />
				</el-icon>
				<el-icon :size="20" @click="themeStore.switchTheme" v-else class="!mr-4 switch-theme"> <i-ep-Moon /> </el-icon>
			</div>
			<el-button type="primary">退出</el-button>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.switch-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor') !important;
	}
}
</style>
