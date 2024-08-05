<template>
	<van-image width="100%" height="14rem" :src="note.note.image_u" fit="cover" position="center" />
	<!-- details 详情 -->
	<div class="card-details">
		<!-- <van-text-ellipsis :content="r.r.n" rows="2" /> -->
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
	note: Object,
});


// 接口有问题！！！！！！！！！！！！！
</script>

<style lang="scss" scoped></style>
