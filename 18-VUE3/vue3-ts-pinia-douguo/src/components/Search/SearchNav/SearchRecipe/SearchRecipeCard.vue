<template>
	<!-- SearchRecipeCard-->
	<div class="search-recipe-card" @click="redirectRecipeDetail(search.r.id)">
		<van-image
			class="recipe-img"
			width="45%"
			height="8rem"
			:src="search.r.img"
			fit="cover"
			position="center"
			lazy-load />
		<!-- introduce 介绍 -->
		<div class="introduce">
			<div class="content">
				<p class="name">{{ search.r.n }}</p>
				<p class="score" v-if="search.r.rate != 0">{{ search.r.rate }}分</p>
				<p class="recipe-list-tags" v-for="text in search.r.recipe_list_tags" v-if="search.r.recipe_list_tags != []">
					{{ text.text }}
				</p>
			</div>

			<!-- author 作者 -->
			<div class="author">
				<van-image round width="1.2rem" height="1.2rem" :src="search.r.a.p" />
				<van-text-ellipsis :content="search.r.a.n" rows="1" v-if="search.r.a" />
			</div>
		</div>
	</div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { useRecipeDetailStore } from '@/stores/recipeDetail';
const recipeDetailStore = useRecipeDetailStore();

defineProps({
	search: Object,
});

// 跳转到菜谱详情页
const redirectRecipeDetail = (recipeId) => {
	recipeDetailStore.recipeId = recipeId;
	router.push({ path: '/recipeDetail', query: { recipeId: recipeId } });
};
</script>

<style lang="scss">
.search-recipe-card {
	display: flex;
	margin: 1rem 1rem;
	.recipe-img {
		.van-image__img {
			border-radius: 0.8rem;
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
			.score {
				font-size: 0.8rem;
			}
			.recipe-list-tags {
				font-size: 0.8rem;
				color: #666666;
			}
			> p {
				margin-bottom: 1rem;
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
</style>
