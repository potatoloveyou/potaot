<template>
	<view class="classlayout">
		<customNavbar :title="'分类'" />
		<view class="classify">
			<themeItem v-for="classify in classifyList" :key="classify._id" :classify="classify"></themeItem>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getClassify } from '@/apis/api';
	import themeItem from '@/components/themeItem/themeItem.vue';

	// 壁纸大分类
	const classifyList = ref([]);
	const Classify = async () => {
		const res = await getClassify({
			pageSize: 15,
		});
		classifyList.value = res.data;
		console.log(classifyList.value);
	};



	onLoad(() => {
		Classify();
	});
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>
