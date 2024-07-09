<template>
	<van-image width="100%" height="14rem" :src="r.img" fit="cover" position="center" />
	<div class="introduce">{{ r.n }}</div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
	r: Object,
});
</script>

<style lang="scss" scoped>
.recipe-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.introduce {
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
