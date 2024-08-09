<template>
	<div class="navbar">
		<van-nav-bar title="热门活动" placeholder z-index="999" class="navbar-top" @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" size="1.5rem" color="#000" />
			</template>
		</van-nav-bar>
	</div>

	<Activity />
</template>

<script setup>
import Activity from '@/components/Home/HomeActivity/Activity.vue';
// 返回上一级
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped></style>
