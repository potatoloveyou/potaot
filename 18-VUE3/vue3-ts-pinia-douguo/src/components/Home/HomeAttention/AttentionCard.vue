<template>
	<div class="author-card-top">
		<van-image width="2rem" height="2rem" :src="item.u.p" :lazy-load="true" round fit="cover" position="center" />
		<!-- author-information 作者信息 -->
		<div class="author-information">
			<div class="author-information-top">
				<div class="author-name">{{ item.u.n }}</div>
				<div class="author-vip">Lv.{{ item.u.lv }}</div>
			</div>
			<div class="author-information-bottom">
				<!-- 粉丝数 -->
				<div class="author-fans">
					{{ item.u.followers_count_text }}
				</div>
				<!-- 菜谱数 -->
				<div class="recipes-count-text" v-if="item.u.recipes_count_text">
					{{ item.u.recipes_count_text }}
				</div>
				<!-- 课程数 -->
			</div>
		</div>
	</div>
	<van-image width="100%" height="100%" :src="item.img" :lazy-load="true" />

	<div class="author-card-bottom">
		<div class="card-information">
			<div class="author-name">{{ item.collect_count_text }}</div>
			<van-text-ellipsis :content="item.t" rows="1" />
		</div>
		<!-- 收藏、评论、分享 -->
		<div class="analysis">
			<!-- collect 收藏 -->
			<div class="collect">
				<van-icon
					name="star-o"
					size="1.5rem"
					@click="addFav({ type: item.type, recipe: item })"
					v-if="!isInFav({ type: item.type, id: item.id })" />

				<van-icon name="star" size="1.5rem" color="#ffce2d" @click="removeFav({ type: 1, id: item.id })" v-else />
			</div>
			<van-icon name="chat-o" size="1.5rem" />
			<van-icon name="share-o" size="1.5rem" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

defineProps({
	item: Object,
});

// 添加收藏
const addFav = ({ type, recipe }) => favoritesStore.addFav({ type, recipe });

// 移除收藏
const removeFav = ({ type, id }) => favoritesStore.removeFav({ type, id });

// 是否在收藏中
const isInFav = favoritesStore.isInFav;
</script>

<style lang="scss" scoped>
.author-card-top {
	display: flex;
	padding: 0.8rem;
	.author-information {
		display: flex;
		flex-direction: column;
		margin-left: 0.8rem;

		.author-information-top {
			display: flex;
			align-items: flex-end;

			.author-name {
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
		.author-information-bottom {
			display: flex;
			color: #999;
			font-size: 0.8rem;
			.recipes-count-text {
				margin-left: 0.4rem;
			}
		}
	}
}

.author-card-bottom {
	padding: 0.8rem;
	display: flex;
	justify-content: space-between;
	.analysis {
		display: flex;
	}
}
</style>
