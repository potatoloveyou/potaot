<template>
	<div class="noteDetail-card" @click="toNoteDetail(noteDetail.note.id.toString())">
		<van-image width="100%" height="14rem" :src="noteDetail.note.image_u" fit="fill" position="center" />
		<div class="card-details">
			<van-text-ellipsis :content="noteDetail.note.title" rows="2" />
		</div>
	</div>

	<!-- information 信息 -->
	<div class="information">
		<!-- author 作者 -->
		<div class="author">
			<van-image round width="1rem" height="1rem" :src="noteDetail.note.author.p" :lazy-load="true" />
			<van-text-ellipsis :content="noteDetail.note.author.n" rows="1" />
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

import { useNoteDetailStore } from '@/stores/noteDetail';
const noteDetailStore = useNoteDetailStore();

defineProps({
	noteDetail: Object,
});

// 跳转到笔记详情页;
const toNoteDetail = noteDetailStore.toNoteDetail;

</script>

<style lang="scss" scoped>
.information {
	margin: 0.6rem 0;
	padding: 0 0.4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// 作者
	.author {
		display: flex;
		align-items: center;
		flex: 1;
		.van-text-ellipsis {
			font-size: 0.7rem;
			color: #999;
			margin-left: 0.2rem;
			flex: 1;
		}
	}
}
</style>
