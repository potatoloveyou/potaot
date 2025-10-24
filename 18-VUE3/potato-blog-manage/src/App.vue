<template>
	<div class="app-theme">
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
.app-theme {
	transition: all 0.3s ease-in-out;
	@include useTheme {
		background-color: getVar('bgColor');
	}
}
</style>
