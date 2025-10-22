<template>
	<div class="potato-theme">
		<RouterView />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
</script>
<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.potato-theme {
	@include useTheme {
		color: getVar('textColor') !important;
		background-color: getVar('bgColor') !important;
	}
}
</style>
