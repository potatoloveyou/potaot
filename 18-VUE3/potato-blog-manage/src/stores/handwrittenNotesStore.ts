import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';

// 随手笔记存储
export const useHandwrittenNotesStore = defineStore('handwrittenNotes', () => {
	// 笔记标题
	const noteTitle = ref<string>('');
	// 笔记内容
	const noteContent = ref<string>('');
	// 是否保存过笔记
	const isSaved = ref<boolean>(false);

	// 当标题或内容变化时，自动把 isSaved 重置为 false
	watch([noteTitle, noteContent], ([newTitle, newContent], [oldTitle, oldContent]) => {
		if (newTitle !== oldTitle || newContent !== oldContent) {
			isSaved.value = false;
		}
	});

	// 天气图标
	const weatherIcon = reactive({
		0: 'icon-hangzhoubei-tianqi-tianqing',
		1: 'icon-duoyun',
		2: 'icon-yintian',
		3: 'icon-wumai',
		4: 'icon-xiayu-yewan',
		5: 'icon-tianqi-leidiantianqi',
		6: 'icon-xiaxue',
		7: 'icon-youfeng',
	});

	// 天气
	const weather = ref<string>(weatherIcon[0]);

	return {
		noteTitle,
		noteContent,
		isSaved,
		weatherIcon,
		weather,
	};
});
