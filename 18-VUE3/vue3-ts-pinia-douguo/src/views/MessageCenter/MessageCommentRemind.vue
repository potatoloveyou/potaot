<template>
	<!-- 评论和@ -->
	<div class="navbar">
		<van-nav-bar title="评论和@" placeholder z-index="999" class="navbar-top" @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" size="1.5rem" color="#000" />
			</template>
		</van-nav-bar>
	</div>
</template>

<script setup>
// 返回上一级
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped></style>
