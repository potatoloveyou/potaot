<template>
	<div class="homeRecommend-card" @click="redirectRecipeDetail(note)">
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
				@click="addFav({ type: note.type, note: note.note })"
				v-if="!isInFav({ type: note.type, id: note.note.id })" />
			<van-icon name="star" @click="removeFav({ type: note.type, id: note.note.id })" v-else />
			<div class="number">
				{{ note.note.like_count }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

import { useRecipeDetailStore } from '@/stores/recipeDetail';
const recipeDetailStore = useRecipeDetailStore();

defineProps({
	note: Object,
});

// 添加收藏
const addFav = ({ type, note }) => {
	favoritesStore.addFav({ type, note });
	// console.log(type, note);
};

// 移除收藏
const removeFav = ({ type, id }) => favoritesStore.removeFav({ type, id });

// 是否在收藏中
const isInFav = ({ type, id }) => favoritesStore.isInFav({ type, id });

// 跳转到菜谱详情页
const redirectRecipeDetail = (note: any) => recipeDetailStore.redirectRecipeDetail(note);
</script>

<style lang="scss" scoped></style>
