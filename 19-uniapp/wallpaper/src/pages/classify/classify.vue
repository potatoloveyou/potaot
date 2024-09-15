<template>
	<view class="classlayout">
		<view class="classify">
			<themeItem v-for="(item, index) in 15" :key="index"></themeItem>
		</view>
	</view>
</template>

<script setup lang="ts">
	import themeItem from '@/components/themeItem/themeItem.vue';
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>
