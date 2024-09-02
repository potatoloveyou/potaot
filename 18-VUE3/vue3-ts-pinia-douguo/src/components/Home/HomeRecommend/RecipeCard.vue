<template>
	<div class="homeRecommend-card" @click="toRecipeDetail(r.r.id.toString())">
		<van-image width="100%" height="14rem" :src="r.r.img" fit="cover" position="center" />
		<!-- details 详情 -->
		<div class="card-details">
			<van-text-ellipsis :content="r.r.n" rows="2" />
		</div>
	</div>

	<!-- information 信息 -->
	<div class="information">
		<!-- author 作者 -->
		<div class="author">
			<van-image round width="1rem" height="1rem" :src="r.r.a.p" :lazy-load="true" />
			<van-text-ellipsis :content="r.r.a.n" rows="1" />
		</div>
		<!-- collect 收藏 -->
		<div class="collect">
			<van-icon
				name="star-o"
				@click="addFav({ type: r.type, id: r.r.id.toString() })"
				v-if="!isInFav({ type: r.type, id: r.r.id.toString() })" />
			<van-icon name="star" @click="removeFav({ type: r.type, id: r.r.id.toString() })" v-else />
			<div class="number">
				{{ r.r.fc }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

import { useRecipeDetailStore } from '@/stores/recipeDetail';
const recipeDetailStore = useRecipeDetailStore();

// 提示弹窗------------------------------没有实现成功
// import { showToast } from 'vant';
// showToast({
// 	message: '顶部展示',
// 	position: 'top',
// });

defineProps({
	r: Object,
});

// 添加收藏
const addFav = favoritesStore.addFav;

// 移除收藏
const removeFav = favoritesStore.removeFav;

// 是否在收藏中
const isInFav = computed(() => favoritesStore.isInFav);

// 跳转到菜谱详情页
const toRecipeDetail = recipeDetailStore.toRecipeDetail;
</script>

<style lang="scss">
.list-card {
	.item-card {
		.van-image {
			.van-image__img {
				border-radius: 0.8rem 0.8rem 0 0;
			}
		}
	}
}

.card-details {
	padding: 0 0.4rem;
	// 详情
	.van-text-ellipsis {
		font-weight: bold;
		margin: 0.4rem 0;
	}
}
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

	// 收藏
	.collect {
		color: #999;
		display: flex;
		align-items: center;
		.van-icon-star {
			color: #ffce2d;
		}
		.number {
			margin-top: 0.2rem;
		}
	}
}
</style>
