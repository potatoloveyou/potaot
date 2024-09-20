import { computed, ref } from 'vue';
const SYSTEM_INFO = uni.getSystemInfoSync();

export const getStatusBarHeight = computed(() => SYSTEM_INFO.statusBarHeight || 15);

export const getTitleBarHeight = computed(() => {
	if (uni.getMenuButtonBoundingClientRect) {
		const { top, height } = uni.getMenuButtonBoundingClientRect();
		return (top - getStatusBarHeight.value) * 2 + height;
	} else {
		return 50;
	}
});

export const getNavBarHeight = computed(() => getStatusBarHeight.value + getTitleBarHeight.value);
