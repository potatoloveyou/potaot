import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { ElMessageBox, ElMessage } from 'element-plus';

// 新建摄影图库状态管理
export const useNewPhotoGalleryStore = defineStore('newPhotoGallery', () => {
	// 文章标题
	const articleTitle = ref<string>('');
	// 文章内容
	const articleContent = ref<string>('');
	// 是否保存过笔记
	const isSaved = ref<boolean>(false);

	// 重置内容
	const reset = () => {
		articleTitle.value = '';
		articleContent.value = '';
		isSaved.value = false;
	};

	// 当标题或内容变化时，自动把 isSaved 重置为 false
	watch([articleTitle, articleContent], ([newTitle, newContent], [oldTitle, oldContent]) => {
		if (newTitle !== oldTitle || newContent !== oldContent) {
			isSaved.value = false;
		}
	});

	/**
	 * 路由离开前确认保存
	 * 返回一个 Promise<boolean>
	 * true => 放行
	 * false => 阻止
	 */
	const confirmLeave = async () => {
		// 已保存过，直接放行
		if (isSaved.value) return true;

		// 没有任何内容，直接放行
		if (!articleTitle.value && !articleContent.value) return true;

		// 有内容，未保存，弹窗确认
		try {
			await ElMessageBox.confirm('笔记尚未提交，是否保存？', '即将离开', {
				confirmButtonText: '确定保存',
				cancelButtonText: '不保存',
				type: 'warning',
				closeOnClickModal: false,
				closeOnPressEscape: false,
				distinguishCancelAndClose: true,
			});

			// 确认保存，设置为已保存
			isSaved.value = true;
			// 显示保存成功消息
			ElMessage.success('保存成功');
			return true;
		} catch (action) {
			if (action === 'cancel') {
				reset();
				return true;
			}
			// 关闭弹窗（× / esc）
			return false;
		}
	};

	return {
		articleTitle,
		articleContent,
		isSaved,
		reset,
		confirmLeave,
	};
});
