<template>
	<van-image fit="cover" :src="recipeData.original_photo_path" />
	<div class="recipedetail">
		<h2 class="title">{{ recipeData.title }}</h2>

		<div class="record">
			<span class="hq" v-if="recipeData.hq">精品 -</span>
			<span class="ecs" v-if="recipeData.ecs">独家 -</span>
			<span>浏览{{ recipeData.views_count_text }} -</span>
			<span>收藏{{ recipeData.favo_counts_text }}</span>
		</div>

		<div class="author">
			<div class="author-left">
				<van-image round width="3rem" height="3rem" :src="recipeData.user.user_photo" />
				<div class="author-name">{{ recipeData.user.nickname }}</div>
				<div class="author-vip">Lv.{{ recipeData.user.lvl }}</div>
			</div>
			<div class="attention">关注</div>
		</div>

		<p class="recipeData">{{ recipeData.cookstory }}</p>

		<div class="foodInventory">
			<div class="foodInventory-top">
				<span class="foodInventory-title">食材清单</span>
				<span class="foodInventory-join" v-if="!isJoinInventory">加入采购清单</span>
				<span class="foodInventory-join" v-else>移除采购清单</span>
			</div>
			<div class="foodInventory-content">
				<ul class="food-list">
					<li class="food-item" v-for="food in recipeData.major">
						<span :class="food.tu ? 'food-name-t' : 'food-name'">{{ food.title }}</span>
						<span class="food-num">{{ food.note }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="nutritional">
			
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
	recipeData: Object,
});

const isJoinInventory = ref(false);
</script>

<style lang="scss" scoped>
.recipedetail {
	padding: 0 1rem;
	.title {
		font-weight: bold;
		font-size: 1.5rem;
		margin-top: 0.4rem;
		line-height: 2;
	}
	.record {
		span {
			padding-left: 0.2rem;
		}
	}
	.author {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 2rem 0;
		.author-left {
			display: flex;
			align-items: center;
			.author-name {
				padding-left: 0.5rem;
				font-size: 0.9rem;
				font-weight: 600;
			}
			.author-vip {
				margin-left: 0.5rem;
				color: #d0a01a;
				font-size: 0.8rem;
				font-weight: bold;
				font-style: italic;
			}
		}
		.attention {
			margin-left: 1rem;
			padding: 0.5rem 1.4rem;
			border-radius: 1rem;
			font-size: 0.8rem;
			background-color: #ffc533;
		}
	}
	p.recipeData {
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 2rem;
	}
	.foodInventory {
		.foodInventory-top {
			display: flex;
			justify-content: space-between;

			.foodInventory-title {
				font-size: 17.6px;
				font-weight: bold;
			}
			.foodInventory-join {
				color: #50969f;
			}
		}
		.foodInventory-content {
			.food-list {
				.food-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 1.5rem 0;
					.food-name-t {
						color: #50969f;
					}

					.food-num {
						width: 6rem;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
}
</style>
