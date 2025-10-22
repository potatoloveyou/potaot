import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
	const themes = ref('light');

	const switchTheme = (): void => {
		themes.value = themes.value === 'light' ? 'dark' : 'light';
		window.document.documentElement.setAttribute('data-theme', themes.value);
	};

	return {
		themes,
		switchTheme,
	};
});
