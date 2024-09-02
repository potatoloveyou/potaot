import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useRouter } from 'vue-router';

export const useNoteDetailStore = defineStore('noteDetail', () => {
	// 笔记Id
	const noteId = ref('');

	const router = useRouter();

	// 跳转到笔记详情页
	const toNoteDetail = (id: string) => {
		noteId.value = id;
		router.push({ path: '/noteDetail', query: { noteId: id } });
	};

	return { noteId, toNoteDetail };
});
