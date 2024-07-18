<template>
	<van-image width="100%" height="14rem" :src="dsp.dsp.logo" fit="contain" position="center" />
	<!-- details 详情 -->
	<div class="card-details">
		<van-text-ellipsis :content="dsp.dsp.name" rows="2" />
		<!-- information 信息 -->
		<div class="information">
			<!-- author 作者 -->
			<div class="author">
				<van-image round width="1rem" height="1rem" :src="dsp.commercial.dsp.logo" />
				<van-text-ellipsis :content="dsp.commercial.dsp.name" rows="1" />
			</div>
			<!-- collect 收藏 -->
			<div class="collect">
				<van-icon
					name="star-o"
					@click="addFav({ type: dsp.type, advertisement: dsp.dsp })"
					v-if="!isInFav({ type: dsp.type, id: dsp.dsp.id })" />
				<van-icon name="star" @click="removeFav({ type: dsp.type, id: dsp.dsp.id })" v-else />
				<div class="number">
					{{ dsp.commercial.dsp.like_count }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
const favoritesStore = useFavoritesStore();

defineProps({
	dsp: Object,
});

// 添加收藏
const addFav = ({ type, advertisement }) => favoritesStore.addFav({ type, advertisement });

// 移除收藏
const removeFav = ({ type, id }) => favoritesStore.removeFav({ type, id });

// 是否在收藏中
const isInFav = ({ type, id }) => favoritesStore.isInFav({ type, id });
</script>

<style lang="scss"></style>
