<template>
	<view class="classroom4">
		<classroom4 :initialCount="initialCount" @minus="minus" @add="add"></classroom4>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import classroom4 from '@/components/classroom4/classroom4.vue';

	const initialCount = ref(5);
	const minus = () => {
		initialCount.value--;
	};
	const add = () => {
		initialCount.value++;
	};
</script>

<style scoped></style>
