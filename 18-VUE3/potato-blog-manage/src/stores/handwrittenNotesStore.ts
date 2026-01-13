import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 随手笔记存储
export const useHandwrittenNotesStore = defineStore('handwrittenNotes', () => {
	// 笔记标题
	const noteTitle = ref<string>('');
	// 笔记内容
	const noteContent = ref<string>('');
  // 是否保存过笔记
  const isSaved = ref<boolean>(false);

	return {
		noteTitle,
		noteContent,
    isSaved,
	};
});
