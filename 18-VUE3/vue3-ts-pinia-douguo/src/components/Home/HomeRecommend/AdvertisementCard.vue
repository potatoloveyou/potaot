<template>
	<div class="homeRecommend-card" @click="toRecipeDetail(dsp)">
		<van-image width="100%" height="14rem" :src="dsp.dsp.logo" fit="contain" position="center" />
		<!-- details 详情 -->
		<div class="card-details">
			<van-text-ellipsis :content="dsp.dsp.name" rows="2" />
		</div>
	</div>

	<!-- information 信息 -->
	<div class="information">
		<!-- author 作者 -->
		<div class="author">
			<van-image round width="1rem" height="1rem" :src="dsp.commercial.dsp.logo" :lazy-load="true" />
			<van-text-ellipsis :content="dsp.commercial.dsp.name" rows="1" />
		</div>
		<!-- collect 收藏 -->
		<div class="collect">
			<van-icon
				name="star-o"
				@click="addFav({ type: dsp.type, id: dsp.dsp.id })"
				v-if="!isInFav({ type: dsp.type, id: dsp.dsp.id.toString() })" />
			<van-icon name="star" @click="removeFav({ type: dsp.type, id: dsp.dsp.id.toString() })" v-else />
			<div class="number">
				{{ dsp.commercial.dsp.like_count }}
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

defineProps({
	dsp: Object,
});

// 添加收藏
const addFav = favoritesStore.addFav;

// 移除收藏
const removeFav = favoritesStore.removeFav;

// 是否在收藏中
const isInFav = computed(() => favoritesStore.isInFav);

// 跳转到菜谱详情页
const toRecipeDetail = (dsp: any) => recipeDetailStore.toRecipeDetail(dsp);
</script>

<style lang="scss"></style>
