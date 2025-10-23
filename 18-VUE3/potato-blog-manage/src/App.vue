<template>
	<div class="switch-theme">
		<RouterView />
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

onMounted(() => {
	themeStore.switchTheme();
});
</script>
<style lang="scss" scoped>
@use '@/assets/styles/theme/handle.scss' as *;
.switch-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		color: getVar('textColor') !important;
		background-color: getVar('bgColor') !important;
	}
}
</style>
