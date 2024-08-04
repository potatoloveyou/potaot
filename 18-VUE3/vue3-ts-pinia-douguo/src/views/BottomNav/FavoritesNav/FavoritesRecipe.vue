<template>
	<!-- 收藏夹菜谱 -->
	<div class="recipe">
		<div class="recipeCard" v-for="recipe in favoritesStore.recipeFav" :key="recipe.id">
			<!-- {{ recipe.n }} -->
			<van-image class="recipe-img" width="45%" height="8rem" :src="recipe.img" fit="cover" position="center" />
			<!-- introduce 介绍 -->
			<div class="introduce">
				<div class="content">
					<p class="name" v-if="recipe.stdname != ''">{{ recipe.stdname }}</p>
					<p class="trim-title" v-if="recipe.trim_title != ''">{{ recipe.trim_title }}</p>
					<div class="watch">{{ recipe.vc }}人看过</div>
				</div>

				<!-- author 作者 -->
				<div class="author">
					<van-image round width="1rem" height="1rem" :src="recipe.a.p" v-if="recipe.a" />
					<van-image round width="1rem" height="1rem" :src="recipe.u.p" v-else/>
					<van-text-ellipsis :content="recipe.a.n" rows="1" v-if="recipe.a" />
					<van-text-ellipsis :content="recipe.u.n" rows="1" v-else />
				</div>
			</div>
		</div>
		<div class="end" v-if="favoritesStore.recipeFav.length != 0">-- End --</div>
	</div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

// console.log(favoritesStore.recipeFav);
favoritesStore.recipeFav.map((item) => {
	console.log(item);
});
</script>

<style lang="scss">
.recipe {
	.recipeCard {
		display: flex;
		margin: 1rem 0;
		.recipe-img {
			.van-image__img {
				border-radius: 16px;
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
