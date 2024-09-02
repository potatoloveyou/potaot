<template>
	<div class="homeRecommend-card" @click="toNoteDetail(note.note.id.toString())">
		<van-image width="100%" height="14rem" :src="note.note.image_u" fit="fill" position="center" />
		<div class="card-details">
			<van-text-ellipsis :content="note.note.title" rows="2" />
		</div>
	</div>

	<!-- information 信息 -->
	<div class="information">
		<!-- author 作者 -->
		<div class="author">
			<van-image round width="1rem" height="1rem" :src="note.note.author.p" :lazy-load="true" />
			<van-text-ellipsis :content="note.note.author.n" rows="1" />
		</div>
		<!-- collect 收藏 -->
		<div class="collect">
			<van-icon
				name="star-o"
				@click="addFav({ type: note.type, id: note.note.id.toString() })"
				v-if="!isInFav({ type: note.type, id: note.note.id.toString() })" />
			<van-icon name="star" @click="removeFav({ type: note.type, id: note.note.id.toString() })" v-else />
			<div class="number">
				{{ note.note.like_count }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

import { useNoteDetailStore } from '@/stores/noteDetail';
const noteDetailStore = useNoteDetailStore();

defineProps({
	note: Object,
});

// 添加收藏
const addFav = favoritesStore.addFav;

// 移除收藏
const removeFav = favoritesStore.removeFav;

// 是否在收藏中
const isInFav = computed(() => favoritesStore.isInFav);

// 跳转到笔记详情页
const toNoteDetail = noteDetailStore.toNoteDetail;
</script>

<style lang="scss" scoped></style>
