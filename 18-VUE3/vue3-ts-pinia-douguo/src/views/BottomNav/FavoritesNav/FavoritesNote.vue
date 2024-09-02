<template>
	<!-- 收藏夹笔记 -->
	<div class="note">
		<div class="list-noteCard">
			<div class="item-noteCard" v-for="note in favoritesStore.noteFav">
				<div class="homeRecommend-card" @click="toNoteDetail(note.id.toString())">
					<van-image width="100%" height="14rem" :src="note.entity.img" fit="fill" position="center" />
					<div class="card-details">
						<van-text-ellipsis :content="note.entity.title" rows="2" />
					</div>
				</div>

				<!-- information 信息 -->
				<div class="information">
					<!-- author 作者 -->
					<div class="author">
						<van-image round width="1rem" height="1rem" :src="note.author.p" :lazy-load="true" />
						<van-text-ellipsis :content="note.author.n" rows="1" />
					</div>

					<!-- collect 收藏 -->
					<div class="collect"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();
console.log(favoritesStore.noteFav);

import { useNoteDetailStore } from '@/stores/noteDetail';
const noteDetailStore = useNoteDetailStore();

// 跳转到笔记详情页
const toNoteDetail = noteDetailStore.toNoteDetail;
</script>

<style lang="scss" scoped>
.list-noteCard {
	// background-color: #9e9e9e15;
	padding: 0 0.8rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 0.8rem;
	.item-noteCard {
		display: flex;
		flex-direction: column;
		// // 四角变圆滑
		// border-radius: 0.8rem;
		background-color: #fff;
		margin: 0.5rem 0;
	}
}
</style>
