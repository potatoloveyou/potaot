<template>
	<!-- 收藏夹菜谱 -->
	<div class="recipe">
		<div
			class="recipeCard"
			v-for="recipe in favoritesStore.recipeFav"
			@click="redirectRecipeDetail(recipe.cook_id.toString())">
			<van-image class="recipe-img" width="45%" height="8rem" :src="recipe.photo_path" fit="cover" position="center" />

			<div class="introduce">
				<div class="content">
					<p class="name">{{ recipe.title }}</p>
					<p class="trim-title" v-if="recipe.trim_title != ''">{{ recipe.trim_title }}</p>
					<div class="watch">{{ recipe.views_count_text || recipe.vc }}人看过</div>
				</div>
				<div class="author">
					<van-image round width="1rem" height="1rem" :src="recipe.user.user_photo" v-if="recipe.user" />
					<van-text-ellipsis :content="recipe.user.nickname" rows="1" v-if="recipe.user" />
				</div>
			</div>
		</div>
		<div class="end" v-if="favoritesStore.recipeFav.length != 0">-- End --</div>
	</div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();
console.log(favoritesStore.recipeFav);

import { useRecipeDetailStore } from '@/stores/recipeDetail';
const recipeDetailStore = useRecipeDetailStore();


// 跳转到菜谱详情页
const redirectRecipeDetail = recipeDetailStore.redirectRecipeDetail;
</script>

<style lang="scss">
.recipe {
	.recipeCard {
		display: flex;
		margin: 1rem 0;
		.recipe-img {
			.van-image__img {
				border-radius: 1rem;
			}
		}
		.introduce {
			flex: 1;
			padding-left: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.content {
				.name {
					font-size: 1.2rem;
					font-weight: bold;
				}
				.trim-title {
					font-size: 1.2rem;
					font-weight: bold;
				}
			}
			.author {
				display: flex;
				align-items: center;
				.van-text-ellipsis {
					font-size: 0.7rem;
					color: #999;
					margin-left: 0.2rem;
					flex: 1;
				}
			}
		}
	}

	.end {
		text-align: center;
		font-size: 1.2rem;
		margin: 1rem 0;
		opacity: 0.2;
	}
}
</style>
